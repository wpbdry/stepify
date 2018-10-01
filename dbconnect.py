
import psycopg2
from psycopg2.extras import RealDictCursor
import json

# FUNCTIONS TO CONNECT TO DB (IMPORTANT THAT WE ALWAYS CLOSE CONN. DB ONLY ALLOWS UP TO 5 CONNECTIONS ###


# For SELECT statements. returns cursor.fetchall() if type is 'all' or cursor.fetchone if type is 'one'
def query(sql, r_type):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor()
    cur.execute(sql)
    r = 'Invalid type parsed'
    if r_type == 'all':
        r = cur.fetchall()
    elif r_type == 'one':
        r = cur.fetchone()
    cur.close()
    conn.close()
    return r


# For other SQL queries
def write(sql):  # For changing data. returns nothing.
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    cur.close()
    conn.close()


# SQL query that returns table as json string
# copied from https://www.peterbe.com/plog/from-postgres-to-json-strings
def query_json(sql):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password=open("db-password.txt", "r").read())
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(sql)
    r = json.dumps(cur.fetchall())
    cur.close()
    conn.close()
    return r
