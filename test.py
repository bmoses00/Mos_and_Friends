import unittest
from data import database_creator, database_query


database_creator.recreate_database()

class TestLogin(unittest.TestCase):
    def testNonExistingAccount(self):
        self.assertFalse(database_query.is_valid_login("does not exist", "nope"))

    def testDefaultAccount(self):
        self.assertTrue(database_query.is_valid_login("admin", "admin"))

    def testAccountCreation(self):
        self.assertFalse(database_query.does_username_exist("newAccount"))
        database_query.create_account("newAccount", "account")
        self.assertTrue(database_query.is_valid_login("newAccount", "account"))


class TestEconData(unittest.TestCase):
    def testGetAllEconData(self):
        data = database_query.get_all_econ_data_basic_info()
        # make sure data is returned
        self.assertNotEqual(data, [])


if __name__ == '__main__':
    unittest.main()