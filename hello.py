
# SETUP ###

import psycopg2
from flask import Flask, request, render_template, redirect
app = Flask(__name__)

# CONNECT TO DB ###

# Connect to an existing database
conn = psycopg2.connect(host="localhost", port="5433", dbname="stepify", user="postgres", password="password")

# PREDEFINED FUNCTIONS ###

# Main page functionality


def show_main_page():
    tasks = [['task1', 'task! deets'], ['task 2', 'task 2 details'], ['task 3: fuck off', 'Details: leave this place.']]
    return render_template("main.html", tasks='Tasks coming soon')
    # return 'You are logged in as ' + check_login() + '. <a href="/logout">Log out</a>'


# Login / sign up functionality


def check_login():  # Returns username if user is logged in and returns False if not
    uip = request.remote_addr  # user's current ip
    cur = conn.cursor()
    cur.execute("SELECT username FROM stepify.logins WHERE ip = '" + uip + "'")
    usern = cur.fetchone()
    cur.close()
    if usern is None:
        return False
    else:
        return usern[0]


def find_user(u):  # find user by username and returns id
    cur = conn.cursor()
    cur.execute("SELECT id FROM stepify.users WHERE username = '" + u['username'] + "'")
    uid = cur.fetchone()
    if uid:
        uid = uid[0]
    cur.close()
    return uid


def log_user_in(un):  # record that user is logged in
    ip = request.remote_addr  # user's current ip
    cur = conn.cursor()
    cur.execute("INSERT INTO stepify.logins (username, ip) VALUES (%s, %s)", (un, ip))
    conn.commit()
    cur.close()


def log_user_out(un):
    ip = request.remote_addr  # user's current ip
    cur = conn.cursor()
    cur.execute("DELETE FROM stepify.logins WHERE username = '" + un + "' AND ip = '" + ip + "'")
    conn.commit()
    cur.close()


def process_login(u):
    if find_user(u) is None:  # if user in not registered
        return u['username'] + ' is not yet registered. <a href="signup">Sign up now</a>'
    else:
        cur = conn.cursor()
        uid = find_user(u)
        cur.execute("SELECT password FROM stepify.users WHERE id = " + str(uid))  # get correct password
        pw = cur.fetchone()[0]
        cur.close()
        if pw == u['password']:  # if password is correct
            # Log user in
            log_user_in(u['username'])
            # Display welcome message
            return show_main_page()
        else:  # if password is wrong
            return 'Oops, wrong password. <a href="login">Back</a>'


def process_signup(u):
    if find_user(u) is None:
        # Sign user up
        cur = conn.cursor()
        cur.execute("INSERT INTO stepify.users (username, password) VALUES (%s, %s)", (u['username'], u['password']))
        conn.commit()
        cur.close()
        # Log user in
        log_user_in(u['username'])
        # Move on to choose your study program
        return redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + u['username'] + ' is already taken. <a href="/">Go back</a>'


def set_user_sp_and_tasks(study_program):
    un = check_login()
    # record user's study program
    cur = conn.cursor()
    cur.execute("UPDATE stepify.users SET study_program = '" + study_program + "' WHERE username = '" + un + "'")
    conn.commit()
    cur.close()

    # set user's tasks based on study program

    # first get a list of tasks (as ids) relevant to this study program
    cur = conn.cursor()
    cur.execute("SELECT id FROM stepify.tasks WHERE " + study_program + " = 'yes';")
    task_ids = cur.fetchall()
    cur.close()

    # then get user's id (in users table)
    cur = conn.cursor()
    cur.execute("SELECT id FROM stepify.users WHERE username = '" + un + "';")
    user_id = cur.fetchone()[0]
    cur.close()

    # then link the tasks to the user in the users_tasks table
    for task_id in task_ids:
        cur = conn.cursor()
        cur.execute("INSERT INTO stepify.users_tasks (user_id, task_id, completion) VALUES (%s, %s, 'no')", (user_id, task_id))
        conn.commit()
        cur.close()


# TO DO ORDER
# set up tasks tables in db (done)
# - discuss and implement study program selection / relevant tasks thing (currently doesn't work for haven't decided yet)
# figure out sql query to get the relevant info back for a specific user (tasks not done)
# send the return from sql query directly to js
# restructure it in js
# dynamically update html with the restructured data

"""
/*Select all tasks for a user*/
SELECT stepify.tasks.id, stepify.tasks.task_name, stepify.tasks.task_details, stepify.users_tasks.completion
	FROM stepify.tasks
	JOIN stepify.users_tasks
		ON stepify.users_tasks.task_id = stepify.tasks.id
	WHERE stepify.users_tasks.user_id = '15'
		AND stepify.users_tasks.completion = 'no'
		
/*Mark a specific task as done for a specific user*/
UPDATE stepify.users_tasks SET completion = 'yes' WHERE user_id = '15' AND task_id = '8'
"""

# ROUTES ###

@app.route('/')
def hello_world():
    if check_login() is False:
        return render_template('signup-login.html')
    else:
        return show_main_page()

@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        return process_login(request.form)

    # the code below is executed if the request method was GET
    return render_template('404.html', error=error)


@app.route('/signup', methods=['POST', 'GET'])
def sign_up():
    error = None
    if request.method == 'POST':
        return process_signup(request.form)

    # the code below is executed if the request method was GET
    return render_template('404.html', error=error)

@app.route('/logout')
def logout_page():
    un = check_login()
    log_user_out(un)
    return render_template('signup-login.html')

@app.route('/choose-your-study-program', methods=['POST', 'GET'])
def sp():
    error = None
    if request.method == 'POST':
        p = request.form['study-program']
        set_user_sp_and_tasks(p)
        return show_main_page()

    # the code below is executed if the request method was GET
    return render_template('studyprograms.html', error=error)
