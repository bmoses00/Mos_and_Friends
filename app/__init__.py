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
            flash("You logged in", "success")
            return redirect(url_for("home"))
        else:
            flash("Wrong username or password", "danger")
            return render_template("login.html")
    elif request.method == "GET":
        if "username" in session:
            # Logged in user cannot login again
            return redirect(url_for("home"))
        return render_template("login.html")


@app.route("/create-account", methods=["GET", "POST"])
def create_account():
    if request.method == "POST":
        # User entered create account information
        username = request.form["username"]
        password = request.form["password"]
        password_repeat = request.form["password_repeat"]

        if password != password_repeat:
            flash("Passwords do not match", "danger")
        elif len(password.strip()) == 0:
            flash("Passwords must not be blank", "danger")
        elif len(username.strip()) == 0:
            flash("Username must not be blank", "danger")
        elif database_query.does_username_exist(username):
            flash("Username already exists", "danger")
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
    return render_template("view-data.html", data_sets=econ_data)


@app.route("/logout")
def logout():
    print("Logged out of session (username " + session["username"] + ")")
    session.clear()
    flash("You logged out", "success")
    return redirect(url_for("login"))


@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/view-studies")
def view_studies():
    case_studies = database_query.get_all_case_studies()
    return render_template("view-studies.html", case_studies=case_studies)


@app.route("/view-study/<string:id>")
def view_study(id: str):
    if len(id) != 24:
        # ObjectId must be 24 characters long
        flash("Invalid study id", "danger")
        return redirect(url_for("view_studies"))
    case_study = database_query.get_case_study(id)
    if case_study is None:
        flash("Case study does not exist", "danger")
        return redirect(url_for("view_studies"))
    return render_template("view-study.html", case_study=case_study, id = id)


@app.route("/create-study", methods=["GET", "POST"])
def create_study():
    """
    If sending POST, need:
    {
        title: “title”,
        description: “random text”,
        content: [
            {
                type: “chart”| “text”
                // if chart type
                chart_start: “YYYY-MM-01”,
                chart_end: “YYYY-MM-01”,
                chart_name: string,
                // if text type
                text: text
            },
            …
        ]
    }
    """
    if request.method == "POST":
        if "username" not in session:
            return "Login to create case study", 400
        case_study = request.get_json()
        case_id = database_query.create_case_study(session["username"], case_study["title"], case_study["description"], case_study["content"])
        return {"redirect": "view-study/" + case_id}
    elif request.method == "GET":
        if "username" not in session:
            flash("Login to create a case study", "danger")
            return redirect(url_for("home"))
        econ_data = database_query.get_all_econ_data_basic_info()
        return render_template("create-study.html", data_sets=econ_data, data_sets_json = json.dumps(econ_data))


@app.route("/delete-study/<string:id>", methods=["DELETE", "GET"])
def delete_study(id: str):
    case_study = database_query.get_case_study(id)
    if case_study is None:
        return "Case study does not exist. Cannot delete", 400
    elif "username" in session and session["username"] == case_study["username"]:
        database_query.delete_case_study(id)
        return redirect(url_for("view_studies"))
    else:
        return "No permission", 400


if __name__ == "__main__":
    app.debug = True
    app.run()
