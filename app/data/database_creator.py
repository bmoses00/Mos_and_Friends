from data import DATA_COLLECTION, mongo_client, LOGIN_COLLECTION, econ_data_info, DATA_COLLECTION, CASE_STUDIES_COLLECTION, DATABASE_NAME
import csv
import json

database = mongo_client[DATABASE_NAME]

def load_econ_data_sets():
    """
    Each econ data collection will be formatted as:
    {
        name: string,
        start_date: "YYYY-MM-DD",
        end_date: "YYYY-MM-DD",
        // first element will always be date
        column_names: [string, string]
        data: [
                {
                    date: "YYYY-MM-DD",
                    value: number
                },
                {
                    date: "YYYY-MM-DD",
                    value: number
                },
                ...
            ]
        }
    }
    """
    for info in econ_data_info:
        with open(f"app/static/csv/{info['file_name']}") as csv_file:
            csv_data = list(csv.reader(csv_file))
        # csv first row is header with name of each row
        column_names = csv_data.pop(0)
        data = []
        for element in csv_data:
            data.append({"date": element[0], "value": element[1]})
        name = info["name"]
        database[DATA_COLLECTION].insert({
            "name": name,
            "start_date": data[0]["date"],
            "end_date": data[len(data) - 1]["date"],
            "column_names": column_names,
            "data": data
        })


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
                type: string, // either "chart" | "text"
                // if type is "chart", these fields exist
                chart_start: string,
                chart_end: string,
                chart_name: string, // csv file name without the .csv

                // null values if second dataset is not selected. optional to fill out
                chart_start_2: string,
                chart_end_2: string,
                chart_name_2: string, // csv file name without the .csv

                // if type is "text", these fields exist
                text: string
            },
            ...
        ]
        // this will only exist if there is at least 1 comment added
        comments: [
            {
                username: string, // backend will fill out
                comment: string, // frontend gives this
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
    load_econ_data_sets()
    create_users_system()
    create_case_studies_collection()


def insert_sample_case_study():
    with open("great-recession.json") as sample:
        database[CASE_STUDIES_COLLECTION].insert_one(json.load(sample))
    with open("oil-crisis.json") as sample:
        database[CASE_STUDIES_COLLECTION].insert_one(json.load(sample))



if __name__ == "__main__":
    recreate_database()
