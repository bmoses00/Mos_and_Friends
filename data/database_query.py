from data import mongo_client, DATABASE_NAME, LOGIN_COLLECTION

database = mongo_client[DATABASE_NAME]
login_collection = database[LOGIN_COLLECTION]

def is_valid_login(username: str, password: str) -> bool:
    return login_collection.find_one({"username": username, "password": password}) is not None


def does_username_exist(username: str) -> bool:
    return login_collection.find_one({"username": username}) is not None


def create_account(username: str, password: str):
    login_collection.insert_one({"username": username, "password": password})