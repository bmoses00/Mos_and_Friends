import sqlite3

db = sqlite3.connect("data/database.db")
c = db.cursor()

c.execute("""
CREATE TABLE IF NOT EXISTS users(
username TEXT PRIMARY KEY,
password TEXT
)""")
