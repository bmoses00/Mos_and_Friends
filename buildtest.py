import os, random
from flask import Flask, session, render_template, redirect, url_for, request, flash
from data import database_query
app = Flask(__name__)
app.secret_key = "2"

@app.route("/")
def root():
    return render_template("create-study.html")

if __name__ == "__main__":
        app.debug = True
        app.run()
