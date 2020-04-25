import os, random
from flask import Flask, session, render_template, redirect, url_for, request, flash
from data import database_query
app = Flask(__name__)
app.secret_key = "2"

@app.route("/")
def root():
    if "username" in session:
        return redirect(url_for("home"))
    else:
        return redirect(url_for("login"))


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


@app.route("/logout")
def logout():
    print("Logged out of session (username " + session["username"] + ")")
    session.clear()
    flash("You logged out")
    return redirect(url_for("login"))

@app.route("/home")
def home():
    return render_template("home.html")
@app.route('/adventure0')
def adventure0():
    return render_template("adventure0.html")

@app.route('/adventure1')
def adventure1():
    return render_template("adventure1.html")

@app.route('/line_graphs')
def line_graphs():
    return render_template("line_graphs.html")

if __name__ == "__main__":
        app.debug = True
        app.run()
