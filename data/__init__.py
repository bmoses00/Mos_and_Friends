from pymongo import MongoClient
import os
import json
import csv
import datetime

DATABASE_NAME = "mo_and_friends_data"
LOGIN_COLLECTION = "login"
mongo_client = MongoClient("localhost", 27017)
econ_data_info = [
    {
        "file_name": "10_year_treasury_yields.csv",
        # name of mongo collection
        "name": "10_year_treasury_yields",
        "units": "unknown"
    },
    {
        "file_name": "inflation.csv",
        "name": "inflation",
        "units": "unknown"
    },
    {
        "file_name": "unemployment.csv",
        "name": "unemployment",
        "units": "unknown"
    }
]