from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")

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
