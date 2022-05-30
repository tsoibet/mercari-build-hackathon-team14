import sqlite3
import hashlib

SAMPLE_USER = ("sample_user", hashlib.sha256(b"123456").hexdigest())

SAMPLE_CATEGORY_LIST = [("Toy", ), ("Fruit", ), ("Dog Fashion", )]

SAMPLE_ITEM_LIST = [
    ("Broken toy", 1, "sample1.jpg", 1), 
    ("Miyazaki mango", 2, "sample2.jpg", 1), 
    ("New year costume for dog", 3, "sample3.jpg", 1), 
    ("Dog hat", 3, "sample4.jpg", 1)
    ]

SAMPLE_SOURCE_LIST = [("Amazon", "Biccam")]

SAMPLE_HISTORY_LIST = [
    (1, "Fry pan", "history_sample1.jpg", 1), 
    (1, "Tempura pot", "history_sample2.jpg", 1), 
    (1, "Japanese teapot", "history_sample3.jpg", 1)
    ]

def add_sample_data():
    try:
        cur = conn.cursor()

        # Add sample user
        cur.execute('''SELECT id FROM user''')
        if (cur.fetchone() is None):
            cur.execute(
                '''INSERT INTO user(username, hashed_password) VALUES (?, ?)''', SAMPLE_USER)
            conn.commit()
            logger.debug("Added sample user.")
        else:
            logger.debug("Data exists. No need to add sample user.")

        # Add sample categories and items
        cur.execute('''SELECT id FROM category''')
        category_result = cur.fetchone()
        if (category_result is None):
            cur.executemany(
                '''INSERT INTO category(name) VALUES (?)''', SAMPLE_CATEGORY_LIST)
            cur.executemany(
                '''INSERT INTO items(name, category_id, image_filename, user_id) VALUES (?, ?, ?, ?)''', SAMPLE_ITEM_LIST)
            conn.commit()
            logger.debug("Added sample items.")
        else:
            logger.debug("Data exists. No need to add sample items.")

        # Add sample source and external purchase history
        cur.execute('''SELECT id FROM source''')
        source_result = cur.fetchone()
        if (source_result is None):
            cur.executemany(
                '''INSERT INTO source(name) VALUES (?)''', SAMPLE_SOURCE_LIST)
            cur.executemany(
                '''INSERT INTO external_purchase_history(user_id, name, image_filename, source_id) VALUES (?, ?, ?, ?)''', SAMPLE_HISTORY_LIST)
            conn.commit()
            logger.debug("Added sample external purchase history.")
        else:
            logger.debug(
                "Data exists. No need to add sample external purchase history.")

    except Exception as e:
        logger.warn(f"Failed to add sample data. Error message: {e}")
        return ERR_MSG
