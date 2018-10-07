
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import datetime


# Used to convert datetime return from db to something that json can handle
def datetime_to_string(dt):
    if isinstance(dt, datetime.datetime):
        return dt.__str__()


# FUNCTIONS TO CONNECT TO DB (IMPORTANT THAT WE ALWAYS CLOSE CONN. DB ONLY ALLOWS UP TO 5 CONNECTIONS ###


# For SELECT statements. returns cursor.fetchall() if type is 'all' or cursor.fetchone if type is 'one'
def query(sql, inputs, r_type):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor()
    cur.execute(sql, inputs)
    r = 'Invalid type parsed'
    if r_type == 'all':
        r = cur.fetchall()
    elif r_type == 'one':
        r = cur.fetchone()
    cur.close()
    conn.close()
    return r


# For other SQL queries
def write(sql, inputs):  # For changing data. returns nothing.
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor()
    cur.execute(sql, inputs)
    conn.commit()
    cur.close()
    conn.close()


# SQL query that returns table as json string
# copied from https://www.peterbe.com/plog/from-postgres-to-json-strings
def query_json(sql, inputs):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(sql, inputs)
    r = json.dumps(cur.fetchall(), default=datetime_to_string)
    cur.close()
    conn.close()
    return r
