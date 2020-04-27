import unittest
from app import app
from data import database_creator
import json
from flask import template_rendered
from contextlib import contextmanager

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
        case_study = {
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
                    "chart_name": "inflation"
                }
            ]
        }
        # this will redirect us to "/view-data/<UUID>", where we can view the created case study
        response = self.app.post("/create-study", json=case_study, follow_redirects=True)
        redirect_to = json.loads(response.get_data(as_text=True))["redirect"]
        with captured_templates(app) as templates:
            self.app.get("/" + redirect_to)
            template, context = templates[0]
            self.assertEqual(template.name, "view_study.html")

            # to compare if the given case_study and the one returned are identical, jsonify both with order and compare
            # username is added to returned_case_study when handled by /create-study
            case_study["username"] = username
            self.assertEqual(json.dumps(context["case_study"], sort_keys=True), json.dumps(case_study, sort_keys=True), "returned case study does not match with supplied case study")


if __name__ == "__main__":
    unittest.main()
