from data import DATABASE_NAME, mongo_client, LOGIN_COLLECTION, econ_data_info, DATA_COLLECTION, CASE_STUDIES_COLLECTION
import csv

# Recreate the database
database = mongo_client[DATABASE_NAME]


def create_users_system():
    """
    User system formatted as:
    {
        _id: ObjectId
        username: string,
        password: string
    }
    {
        _id: ObjectId
        username: string,
        password: string
    }
    ...
    """
    database[LOGIN_COLLECTION].insert({"username": "admin", "password": "admin"})


def create_case_studies_collection():
    """
    Case studies formatted as:
    {
        _id: ObjectId,
        username: string, // user who created the case study
        title: string,
        description: string,
        content: [
            {
                type: string, // either "chart" or "text"
                // if type is "chart", these fields exist
                chart_start: string,
                chart_end: string,
                chart_name: string, // routing name
                // if type is "text", these fields exist
                text: string
            },
            ...
        ]
    }
    ...
    :return:
    """
    # Example entry
    """
    database[CASE_STUDIES_COLLECTION].insert_one({
        "username": "admin",
        "title": "Getting started with creating your studies!",
        "description": "A small walk through to get you started. We will be using the 2008 recession to show off",
        "content": [
            {
                "type": "text",
                "text": "This is a text!"
            }
        ]
    })
    """
    pass


def recreate_database():
    # Drop the mongo database if it exists
    if DATABASE_NAME in mongo_client.list_database_names():
        mongo_client.drop_database(DATABASE_NAME)

    # recreate data
    create_users_system()
    create_case_studies_collection()
