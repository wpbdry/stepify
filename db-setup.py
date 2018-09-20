import psycopg2

# Connect to an existing database
conn = psycopg2.connect(host="localhost", port="5433", dbname="stepify", user="postgres", password="password")

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.users (id bigserial NOT NULL, username character varying(50) NOT NULL, password character varying(50) NOT NULL, study_program character varying(50), PRIMARY KEY (id)) WITH (OIDS = TRUE);")


# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.logins (id bigserial NOT NULL, username character varying(50), ip character varying(50), PRIMARY KEY (id)) WITH (OIDS = TRUE);")


# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()
conn.close()

