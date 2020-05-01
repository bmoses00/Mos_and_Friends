from data import mongo_client, DATABASE_NAME, LOGIN_COLLECTION, DATA_COLLECTION, econ_data_info, CASE_STUDIES_COLLECTION
from typing import List, Optional
from bson.objectid import ObjectId

database = mongo_client[DATABASE_NAME]
login_collection = database[LOGIN_COLLECTION]
data_collection = database[DATA_COLLECTION]
case_study_collection = database[CASE_STUDIES_COLLECTION]

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
        },
        ...
    ]
    """
    basic_data = []
    for econ_data in econ_data_info:
        query_info = data_collection.find_one({"name": econ_data["name"]}, {"_id": 0, "start_date": 1, "end_date": 1})
        basic_data.append({
            "title": econ_data["title"],
            "name": econ_data["name"],
            "start_date": query_info["start_date"],
            "end_date": query_info["end_date"],
        })
    return basic_data


def create_case_study(username: str, title: str, description: str, content: List[dict]) -> str:
    """
    Stores the newly created case study
    :param username:
    :param title:
    :param description:
    :param content:
    :return: UUID of the case study
    """
    bson_id = case_study_collection.insert_one({
        "username": username,
        "title": title,
        "description": description,
        "content": content
    }).inserted_id
    return str(bson_id)


def get_case_study(uuid: str) -> Optional[dict]:
    """
    Return formatted as:
    {
        title: “title”,
        username: "username"
        description: “random text”,
        content: [
            {
                type: “chart”| “text”
                // if chart type
                chart_start: “YYYY-MM-01”,
                chart_end: “YYYY-MM-01”,
                chart_name: string,
                // if text type
                text: text
            },
            …
        ]
    }
    :param uuid:
    :return:
    """
    query = case_study_collection.find_one({"_id": ObjectId(uuid)})
    if query is None:
        return None
    # remove ObjectId
    del query["_id"]
    return query


def get_all_case_studies() -> List[dict]:
    """
    Return formatted as:
    [
        {
            _id: id
            title: “title”,
            username: "username"
            description: “random text”,
            content: [
                {
                    type: “chart”| “text”
                    // if chart type
                    chart_start: “YYYY-MM-01”,
                    chart_end: “YYYY-MM-01”,
                    chart_name: string,
                    // if text type
                    text: text
                },
                …
            ]
        },
        ...
    ]
    :return:
    """
    case_studies = list(case_study_collection.find({}))
    for case_study in case_studies:
        case_study["_id"] = str(case_study["_id"])
    return list(case_studies)


def delete_case_study(id: str):
    """
    Deletes a case study
    :param id:
    :return:
    """
    case_study_collection.remove({"_id": ObjectId(id)})


def update_case_study(id: str, title: str, username: str, description: str, content: List[dict]):
    """
    Update the document of the selected case_study
    :param id:
    :param title:
    :param username:
    :param description:
    :param content:
    :return:
    """
    case_study_collection.update({
        "_id": ObjectId(id)
    }, {
        "title": title,
        "username": username,
        "description": description,
        "content": content
    })
