from data import mongo_client, DATABASE_NAME, LOGIN_COLLECTION, DATA_COLLECTION, econ_data_info
from typing import List

database = mongo_client[DATABASE_NAME]
login_collection = database[LOGIN_COLLECTION]
data_collection = database[DATA_COLLECTION]

def is_valid_login(username: str, password: str) -> bool:
    return login_collection.find_one({"username": username, "password": password}) is not None


def does_username_exist(username: str) -> bool:
    return login_collection.find_one({"username": username}) is not None


def create_account(username: str, password: str):
    login_collection.insert_one({"username": username, "password": password})


def get_all_econ_data_basic_info() -> List[dict]:
    """
    :return: Data formatted as
    [
        {
            "title": string,
            "name": string,
            "start_date": string,
            "end_date": string,
            column_names: [string, string]
        },
        ...
    ]
    """
    basic_data = []
    for econ_data in econ_data_info:
        query_info = data_collection.find_one({"name": econ_data["name"]}, {"_id": 0, "start_date": 1, "end_date": 1, "column_names": 1})
        basic_data.append({
            "title": econ_data["title"],
            "name": econ_data["name"],
            "start_date": query_info["start_date"],
            "end_date": query_info["end_date"],
            "column_names": query_info["column_names"]
        })
    return basic_data
