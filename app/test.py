import unittest
from __init__ import app
from data import database_creator
import json
from flask import template_rendered
from contextlib import contextmanager
import pprint

@contextmanager
def captured_templates(app):
    """
    https://stackoverflow.com/a/40531281/7154700
    :param app:
    :return:
    """
    recorded = []

    def record(sender, template, context, **extra):
        recorded.append((template, context))
    template_rendered.connect(record, app)
    try:
        yield recorded
    finally:
        template_rendered.disconnect(record, app)


class Test(unittest.TestCase):
    def setUp(self) -> None:
        # run every time we run a test case
        app.testing = True
        self.app = app.test_client()
        database_creator.recreate_database()

    def login(self, username: str, password: str):
        return self.app.post("/login", data={
            "username": username,
            "password": password
        }, follow_redirects=True)

    def logout(self):
        return self.app.get("/logout", follow_redirects=True)

    def create_account(self, username: str, password: str):
        return self.app.post("/create-account", data={
            "username": username,
            "password": password,
            "password_repeat": password,
        }, follow_redirects=True)

    def test_login(self):
        # create account
        username = "username123"
        password = "password123"
        self.create_account(username, password)
        self.login(username, password)
        with self.app as c:
            with c.session_transaction() as session:
                # make sure session knows you are logged in
                self.assertEqual(session["username"], username)
        self.logout()
        with self.app as c:
            with c.session_transaction() as session:
                # make sure session knows you are logged in
                self.assertFalse("username" in session)

    def test_create_study(self):
        username = "user"
        password = "pass"
        self.create_account(username, password)
        self.login(username, password)
        case_study_1 = {
            "title": "this is the title",
            "description": "this is the description",
            "content": [
                {
                    "type": "text",
                    "text": "this is an example text"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-01-01",
                    "chart_end": "2020-01-01",
                    "chart_name": "inflation",
                    "chart_start_2": None,
                    "chart_end_2": None,
                    "chart_name_2": None,
                }
            ]
        }
        # this will redirect us to "/view-data/<UUID>", where we can view the created case study
        response = self.app.post("/create-study", json=case_study_1, follow_redirects=True)
        redirect_to = json.loads(response.get_data(as_text=True))["redirect"]
        with captured_templates(app) as templates:
            self.app.get("/" + redirect_to)
            template, context = templates[0]
            self.assertEqual(template.name, "view-study.html")

            # to compare if the given case_study and the one returned are identical, jsonify both with order and compare
            # username is added to returned_case_study when handled by /create-study
            case_study_1["username"] = username
            self.assertEqual(json.dumps(context["case_study"], sort_keys=True), json.dumps(case_study_1, sort_keys=True), "returned case study does not match with supplied case study")

    def test_view_all_case_studies(self):
        username = "user"
        password = "pass"
        self.create_account(username, password)
        self.login(username, password)
        case_study_1 = {
            "title": "this is the title all1",
            "description": "this is the description",
            "content": [
                {
                    "type": "text",
                    "text": "this is an example text"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-01-01",
                    "chart_end": "2020-01-01",
                    "chart_name": "inflation"
                }
            ]
        }
        case_study_2 = {
            "title": "this is the title 2 all 2",
            "description": "this is the description 2",
            "content": [
                {
                    "type": "text",
                    "text": "this is an example text 2"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-02-02",
                    "chart_end": "2020-02-02",
                    "chart_name": "inflation"
                }
            ]
        }
        self.app.post("/create-study", json=case_study_1, follow_redirects=True)
        self.app.post("/create-study", json=case_study_2, follow_redirects=True)
        with captured_templates(app) as templates:
            self.app.get("/view-studies")
            template, context = templates[0]
            self.assertEqual(template.name, "view-studies.html")

            # username is added to returned_case_study when handled by /create-study
            case_study_1["username"] = username
            case_study_2["username"] = username

            # do not check if you have _id field
            for case in context["case_studies"]:
                if "_id" not in case:
                    self.fail("no _id")
                del case["_id"]

            # to compare if the given case_study and the one returned are identical, jsonify both with order and compare
            # create list of json string
            sent_case_studies = [json.dumps(case_study_1, sort_keys=True), json.dumps(case_study_2, sort_keys=True)]
            retrieved_case_studies = [json.dumps(x, sort_keys=True) for x in context["case_studies"]]
            self.assertEqual(set(sent_case_studies), set(retrieved_case_studies))

    def test_delete_case_study(self):
        username = "user_delete"
        password = "pass_delete"
        self.create_account(username, password)
        self.login(username, password)
        case_study_1 = {
            "title": "this is the title delete",
            "description": "this is the description delete",
            "content": [
                {
                    "type": "text",
                    "text": "this is an example text delete"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-01-01",
                    "chart_end": "2020-01-01",
                    "chart_name": "inflation"
                }
            ]
        }
        response: str = json.loads(self.app.post("/create-study", json=case_study_1, follow_redirects=True).get_data(as_text=True))["redirect"]
        # just get the id off of response redirect link
        id = response.replace("view-study/", "")
        self.app.delete("/delete-study/" + id)
        # make sure when we get all case studies it doesn't exist
        with captured_templates(app) as templates:
            self.app.get("/view-studies")
            template, context = templates[0]
            self.assertEqual(template.name, "view-studies.html")

            # username is added to returned_case_study when handled by /create-study
            case_study_1["username"] = username

            # do not check if you have _id field
            for case in context["case_studies"]:
                del case["_id"]

            # to compare if the given case_study and the one returned are identical, jsonify both with order and compare
            # create list of json string
            sent_case_study = json.dumps(case_study_1, sort_keys=True)
            retrieved_case_studies = [json.dumps(x, sort_keys=True) for x in context["case_studies"]]
            self.assertTrue(sent_case_study not in retrieved_case_studies)


    def test_update_case_study(self):
        username = "user"
        password = "pass"
        self.create_account(username, password)
        self.login(username, password)
        case_study = {
            "title": "this is the title to be updated",
            "description": "this is the description to be updated",
            "content": [
                {
                    "type": "text",
                    "text": "this is an example text to be updated"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-01-01",
                    "chart_end": "2020-01-01",
                    "chart_name": "inflation"
                }
            ]
        }
        response = self.app.post("/create-study", json=case_study, follow_redirects=True)
        redirect_to = json.loads(response.get_data(as_text=True))['redirect']
        case_id = redirect_to.replace("view-study/", "")
        # update the values
        case_study["title"] = "updated title"
        case_study["description"] = "updated description"
        case_study["content"][0]["text"] = "updated text"
        self.app.post("/update-study/" + case_id, json=case_study, follow_redirects=True)
        # username is added when handled by /create-study
        case_study["username"] = username
        with captured_templates(app) as templates:
            self.app.get("/" + redirect_to)
            _, context = templates[0]
            self.assertDictEqual(context["case_study"], case_study, "returned case study has unexpected values")

    def test_comments(self):
        creator_username = "user"
        password = "pass"
        self.create_account(creator_username, password)
        self.login(creator_username, password)
        case_study = {
            "title": "this is the title with comment",
            "description": "this is the description with comment",
            "content": [
                {
                    "type": "text",
                    "text": "some text"
                },
                {
                    "type": "chart",
                    "chart_start": "2019-01-01",
                    "chart_end": "2020-01-01",
                    "chart_name": "inflation"
                }
            ]
        }
        response = self.app.post("/create-study", json=case_study, follow_redirects=True)
        redirect_to = json.loads(response.get_data(as_text=True))['redirect']
        case_id = redirect_to.replace("view-study/", "")
        # username will be added by flask
        case_study["username"] = creator_username
        self.logout()

        username1 = "commenter1"
        self.create_account(username1, password)
        self.login(username1, password)
        comment1 = {"comment": "very cool case study, 10/10"}
        self.app.post("add-comment/" + case_id, json=comment1, follow_redirects=True)
        self.logout()

        username2 = "commenter2"
        self.create_account(username2, password)
        self.login(username2, password)
        comment2 = {"comment": "bad case study, 3/10"}
        self.app.post("add-comment/" + case_id, json=comment2, follow_redirects=True)
        self.logout()

        # comments should look like this:
        comment1["username"] = username1
        comment2["username"] = username2
        comments = [comment1, comment2]
        case_study["comments"] = comments

        # test if we stored and retrieve all comments
        with captured_templates(app) as templates:
            self.app.get("/" + redirect_to)
            _, context = templates[0]
            self.assertDictEqual(context["case_study"], case_study)

        # update the case study to make sure we didn't delete the comments
        self.login(creator_username, password)
        # temporarily remove comments and username since the client won't have this info when updating
        del case_study["username"]
        del case_study["comments"]
        case_study["title"] = "updated title with comments"
        self.app.post("/update-study/" + case_id, json=case_study, follow_redirects=True)
        # add the username and comments back
        case_study["username"] = creator_username
        case_study["comments"] = comments

        with captured_templates(app) as templates:
            self.app.get("/" + redirect_to)
            _, context = templates[0]
            self.assertDictEqual(context["case_study"], case_study)


if __name__ == "__main__":
    unittest.main()
    database_creator.recreate_database()
