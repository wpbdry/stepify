import psycopg2

# Change db functions. Maybe like this.
# Probably not cause then you never know if you're gonna get an array back or a string
# Rather change it so that it always return a 2D array.


# For SELECT statements. Returns list inside list if result is table, else returns list. Returns Null if no results
def db_query(sql):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password="gpdpTataCu14tbTM7ABFYFyuO8Kuq5f2")
    cur = conn.cursor()
    cur.execute(sql)
    result = cur.fetchall()
    cur.close()
    conn.close()

    # if absolutely no result
    if not result:
        return None

    # else if result only contains one column
    elif len(result[0]) == 1:
        # if it only contains one row in that column
        if len(result) == 1:
            return result[0][0]

        # else if it contains more than one row in the one column
        r = []
        for item in result:
            r.append(item[0])
        return r

    # else if result only contains one row but many columns
    elif len(result) == 1:
        return result[0]

    # else if result is a two dimentional list, return everything
    return result








print(db_query("SELECT id FROM stepify.users"))


# OTHER IDEAS
# remove or combine find users functions
# external sql files?
# replace yes and no in db with 1 and 0