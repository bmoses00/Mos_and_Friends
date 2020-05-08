from data import database_creator

if __name__ == "__main__":
    database_creator.recreate_database()
    database_creator.insert_sample_case_study()