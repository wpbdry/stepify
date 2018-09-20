import psycopg2

# Connect to an existing database
conn = psycopg2.connect(host="localhost", port="5433", dbname="stepify", user="postgres", password="password")

# USERS TABLE

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.users (id bigserial NOT NULL, username character varying(50) NOT NULL, password character varying(50) NOT NULL, study_program character varying(50), PRIMARY KEY (id)) WITH (OIDS = TRUE);")

# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()

# LOGINS TABLE

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.logins (id bigserial NOT NULL, username character varying(50), ip character varying(50), PRIMARY KEY (id)) WITH (OIDS = TRUE);")

# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()

# TASKS TABLE

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.tasks (id bigserial NOT NULL, task_name TEXT NOT NULL, task_details TEXT NOT NULL, s_e character varying(4), i_d character varying(4), p_m character varying(4), PRIMARY KEY (id)) WITH (OIDS = TRUE);")

# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()

# USERS_TASKS TABLE

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute("CREATE TABLE stepify.users_tasks (id bigserial NOT NULL, user_id INT NOT NULL, task_id INT NOT NULL, completion character varying(50), PRIMARY KEY (id)) WITH (OIDS = TRUE);")

# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()

conn.close()

