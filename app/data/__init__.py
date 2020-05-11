from pymongo import MongoClient
import os
import json
import csv
import datetime

DATABASE_NAME = "mo_and_friends_data"
LOGIN_COLLECTION = "login"
DATA_COLLECTION = "data"
CASE_STUDIES_COLLECTION = "case_studies"
mongo_client = MongoClient("localhost", 27017)
'''
{
    "file_name": name of the file in "data/csv" directory
    "name": name of csv file without the ".csv". Used to get data from DATA_COLLECTION
    "title": what to display to user
    "units": units for second column of csv
}
'''
econ_data_info = [
    {
        "file_name": "10_year_treasury_yields.csv",
        "name": "10_year_treasury_yields",
        "title": "10 Year Treasury Yields",
        "units": "unknown"
    },
    {
        "file_name": "inflation.csv",
        "name": "inflation",
        "title": "Inflation Rate",
        "units": "unknown"
    },
    {
        "file_name": "unemployment.csv",
        "name": "unemployment",
        "title": "Unemployment Rate",
        "units": "unknown"
    },
    {
        "file_name": "exchange_us_eu.csv",
        "name": "exchange_us_eu",
        "title": "US-EU Exchange Rate",
        "units": "unknown"
    },
    {
        "file_name": "gdp.csv",
        "name": "gdp",
        "title": "US GDP",
        "units": "unknown"
    },
    {
        "file_name": "oil_prices.csv",
        "name": "oil_prices",
        "title": "Oil Prices",
        "units": "unknown"
    },
    {
        "file_name": "gdp_change.csv",
        "name": "gdp_change",
        "title": "GDP Growth",
        "units": "unknown"
    },
    {
        "file_name": "house_prices.csv",
        "name": "house_prices",
        "title": "US House Prices",
        "units": "unknown"
    }
]
