import os, random
from flask import Flask, session, render_template, redirect, url_for, request, flash
from data import database_query
import json
app = Flask(__name__)
app.secret_key = "2"

@app.route("/")
def root():
    return redirect(url_for("home"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # User is logging in
        username = request.form["username"]
        password = request.form["password"]
        if database_query.is_valid_login(username, password):
            session["username"] = username
            return redirect(url_for("home"))
        else:
            flash("Wrong username or password")
            return render_template("login.html")
    elif request.method == "GET":
        if "username" in session:
            # Logged in user cannot login again
            redirect(url_for("home"))
        return render_template("login.html")


@app.route("/create-account", methods=["GET", "POST"])
def create_account():
    if request.method == "POST":
        # User entered create account information
        username = request.form["username"]
        password = request.form["password"]
        password_repeat = request.form["password_repeat"]

        if password != password_repeat:
            flash("Passwords do not match")
        elif len(password.strip()) == 0:
            flash("Passwords must not be blank")
        elif len(username.strip()) == 0:
            flash("Username must not be blank")
        elif database_query.does_username_exist(username):
            flash("Username already exists")
        else:
            database_query.create_account(username, password)
            print("Created account with username: " + username)
            session["username"] = username
            return redirect(url_for("home"))

    if "username" in session:
        # Logged in user cannot create an account
        return redirect(url_for("home"))
    return render_template("create-account.html")


@app.route("/view-data", methods=["GET"])
def view_data():
    econ_data = database_query.get_all_econ_data_basic_info()
    return render_template("view-data.html", data_sets=econ_data, data_sets_json=json.dumps(econ_data))


@app.route("/logout")
def logout():
    print("Logged out of session (username " + session["username"] + ")")
    session.clear()
    flash("You logged out")
    return redirect(url_for("login"))

@app.route("/home")
def home():
    return render_template("home.html")

case_studies = [
                    {
                        "id": "ab",
                        "title": "Your mum",
                        "description": "This has very interesting properties",
                        "username": "wer",
                        "content": [
                                        {
                                            "type": "chart",
                                            "chart-start": "2000-01-01",
                                            "chart-end": "2015-01-01",
                                            "chart-name": "inflation",
                                        },

                                        {
                                            "type": "text",
                                            "text": "This chart shows inflation",
                                        },

                                        {
                                            "type": "chart",
                                            "chart-start": "2000-01-01",
                                            "chart-end": "2015-01-01",
                                            "chart-name": "unemployment",
                                        },

                                        {
                                            "type": "text",
                                            "text": "This chart shows unemployment",
                                        },


                                   ],
                    },
                    {
                        "id": "j75",
                        "title": "The recession of 1958",
                        "description": "This was bad",
                        "username": "bir",
                        "content": [],
                    },
                ]

@app.route("/view-studies")
def view_studies():
    user_cases = []
    public_cases = []
    for case in case_studies:
        if (case['username'] == session['username']):
            user_cases.append(case)
        else:
            public_cases.append(case)

    return render_template("view-studies.html", user_cases = user_cases, public_cases = public_cases)


@app.route("/view-study/<string:id>")
def view_study(id: str):

    for case in case_studies:
        if (case['id'] == id):
            case_study = case
    return render_template("view_study.html", case_study = case_study)


@app.route("/create-study")
def create_study():
    return render_template("create-study.html")


if __name__ == "__main__":
        app.debug = True
        app.run()
