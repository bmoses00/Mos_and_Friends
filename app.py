from flask import Flask, render_template, jsonify
import datetime
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

@app.route("/<string:data>/<string:date_start>to<string:date_end>")
def data(data, date_start, date_end):
    payload = []
    print(date_start,date_end)
    date_start = date_format(date_start)
    date_end = date_format(date_end)
    with open(f"static/csv/{data}.csv") as csv_file:
        reader = csv.reader(csv_file)
        # skip the first row, which is the header row
        next(reader)
        for entry in reader:
            entry_date = date_format(entry[0])
            if entry_date < date_start or entry_date > date_end or entry[1] == ".":
                continue
            payload.append({'date': entry[0], 'yield': float(entry[1])})
    return jsonify(payload), 200
def date_format(date):
    output = date.split("-")
    return datetime.datetime(int(output[0]), int(output[1]), int(output[2]))




if __name__ == "__main__":
        app.debug = True
        app.run()
