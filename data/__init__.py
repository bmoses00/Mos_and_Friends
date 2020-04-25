from pymongo import MongoClient
import os
import json
import csv
import datetime

DATABASE_NAME = "mo_and_friends_data"
LOGIN_COLLECTION = "login"
DATA_COLLECTION = "data"
mongo_client = MongoClient("localhost", 27017)
'''
{
    "file_name": name of the file in "data/csv" directory
    "name": to get data from collection (database.DATA_COLLECTION.find_one({"name": name})
    "common_name": name to display to user
    "units": units for second column of csv
}
'''
econ_data_info = [
    {
        "file_name": "10_year_treasury_yields.csv",
        "name": "10_year_treasury_yields",
        "common_name": "10 Year Treasury Yields",
        "units": "unknown"
    },
    {
        "file_name": "inflation.csv",
        "name": "inflation",
        "common_name": "Inflation Rate",
        "units": "unknown"
    },
    {
        "file_name": "unemployment.csv",
        "name": "unemployment",
        "common_name": "Unemployment Rate",
        "units": "unknown"
    }
]