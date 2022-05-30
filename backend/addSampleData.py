import os
import logging
import sqlite3
import hashlib
from fastapi import FastAPI, Form, HTTPException, File, UploadFile

logger = logging.getLogger("uvicorn")
logger.setLevel(os.environ.get('LOGLEVEL', 'DEBUG').upper())

ERR_MSG = "ERROR"

SAMPLE_USER = ("sample_user", hashlib.sha256(b"123456").hexdigest())

SAMPLE_CATEGORY_LIST = [("Fashion", ), ("Kitchen", ), ("Living", ), ("Pet", ), ("Other", )]

SAMPLE_ITEM_LIST = [
    (1, "Broken toy", 4, "sample1.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Xmas snood for dog", 4, "sample2.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 88), 
    (1, "New year costume for dog", 4, "sample3.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Dog hat", 4, "sample4.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 49), 
    (1, "Japanese tea set", 3, "sample5.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Bed sheet", 3, "sample6.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Coffee pot", 2, "sample7.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Rubbish bin", 2, "sample8.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 299), 
    (1, "Dyson fan", 3, "sample9.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 500), 
    (1, "High chair", 3, "sample10.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199),         
    (1, "Big plant", 5, "sample11.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Guitar", 5, "sample12.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 199), 
    (1, "Teddy bear", 5, "sample13.jpg", "Doggo ipsum big ol pupper", "Yapper adorable doggo smol borking doggo with a long snoot for pats fat boi ruff, woofer ur givin me a spook.", 50), 
    ]

SAMPLE_SOURCE_LIST = [("Mercari", ), ("Amazon",) , ("Biccam", )]

SAMPLE_HISTORY_LIST = [
    (1, "Fry pan", "history_sample1.jpg", 2, 2, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 90), 
    (1, "Tempura pot", "history_sample2.jpg", 1, 2, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 70), 
    (1, "Japanese teapot", "history_sample3.jpg", 1, 3, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 50), 
    (1, "Down jacket for dog", "history_sample4.jpg", 2, 5, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 40), 
    (1, "Xmas costume for dog", "history_sample5.jpg", 3, 4, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 100), 
    (1, "Mango", "history_sample6.jpg", 2, 5, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 50), 
    (1, "Magician hat", "history_sample7.jpg", 2, 1, "Waggy wags doggo thicc much ruin diet", "Yapper borking doggo ruff heckin angery woofer doing me a frighten, ruff very good spot heckin angery woofer, borkdrive most angery pupper I have ever seen what a nice floof.", 30),             
    ]

def add_sample_data(conn):
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
                '''INSERT INTO items(user_id, name, category_id, image_filename, oneliner_description, detailed_description, price) VALUES (?, ?, ?, ?, ?, ?, ?)''', SAMPLE_ITEM_LIST)
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
                '''INSERT INTO external_purchase_history(user_id, name, image_filename, source_id, category_id, oneliner_description, detailed_description, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', SAMPLE_HISTORY_LIST)
            conn.commit()
            logger.debug("Added sample external purchase history.")
        else:
            logger.debug(
                "Data exists. No need to add sample external purchase history.")

    except Exception as e:
        logger.warn(f"Failed to add sample data. Error message: {e}")
        return ERR_MSG
