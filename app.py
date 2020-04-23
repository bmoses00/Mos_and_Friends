from flask import Flask, render_template, jsonify
import csv
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

@app.route("/<string:data>")
def data(data):
    payload = []
    with open(f"static/csv/{data}.csv") as csv_file:
        reader = csv.reader(csv_file)
        # skip the first row, which is the header row
        next(reader)
        for entry in reader:
            if entry[1] == ".":
                continue
            payload.append({'date': entry[0], 'yield': float(entry[1])})
    return jsonify(payload)

if __name__ == "__main__":
        app.debug = True
        app.run()
