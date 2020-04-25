from data import DATABASE_NAME, mongo_client, LOGIN_COLLECTION, econ_data_info, DATA_COLLECTION
import csv

# Recreate the database
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
        with open(f"data/csv/{info['file_name']}") as csv_file:
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


def recreate_database():
    # Drop the mongo database if it exists
    if DATABASE_NAME in mongo_client.list_database_names():
        mongo_client.drop_database(DATABASE_NAME)

    # recreate data
    load_econ_data_sets()
    create_users_system()
