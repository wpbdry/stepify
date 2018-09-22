
# SETUP ###

from flask import Flask, render_template, request, redirect, Response
import psycopg2

app = Flask(__name__)

# FUNCTIONS TO CONNECT TO DB (IMPORTANT THAT WE ALWAYS  CLOSE CONN. DB ONLY ALLOWS 5 CONNECTIONS ###


# For SELECT statements. returns cursor.fetchall() if type is 'all' or cursor.fetchone if type is 'one'
def db_query(sql, type):
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password="gpdpTataCu14tbTM7ABFYFyuO8Kuq5f2")
    cur = conn.cursor()
    cur.execute(sql)
    r = 'Invalid type parsed'
    if type == 'all':
        r = cur.fetchall()
    elif type == 'one':
        r = cur.fetchone()
    cur.close()
    conn.close()
    return r


def db_write(sql): # For changing data. returns nothing.
    conn = psycopg2.connect(host="horton.elephantsql.com",
                            port="5432",
                            dbname="wxwcglba",
                            user="wxwcglba",
                            password="gpdpTataCu14tbTM7ABFYFyuO8Kuq5f2")
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    cur.close()
    conn.close()


# PREDEFINED FUNCTIONS ###

# Find user data


def find_user_from_all_data(u):  # find user by user info array and returns id
    uid = db_query("SELECT id FROM stepify.users WHERE username = '" + u['username'] + "';", "one")
    if uid:
        uid = uid[0]
    return uid


def find_user_from_uname(un):  # find user by username and returns id
    uid = db_query("SELECT id FROM stepify.users WHERE username = '" + un + "'",
                   "one")
    if uid:
        uid = uid[0]
    return uid


# Main page functionality


def show_main_page():
    # get user id
    uname = check_login()
    uid = str(find_user_from_uname(uname))

    # get list of tasks
    sql_tasks = db_query("SELECT stepify.tasks.id, stepify.tasks.task_name, stepify.tasks.task_details FROM stepify.tasks JOIN stepify.users_tasks ON stepify.users_tasks.task_id = stepify.tasks.id WHERE stepify.users_tasks.user_id = '" + uid + "' AND stepify.users_tasks.completion = FALSE;",
                         "all")

    # load page and send tasks to js
    return render_template("main.html", tasks=sql_tasks, username=check_login())


# Login / sign up functionality


def check_login():  # Returns username if user is logged in and returns False if not
    uip = request.remote_addr  # user's current ip
    usern = db_query("SELECT username FROM stepify.logins WHERE ip = '" + uip + "'",
                     "one")
    if usern is None:
        return False
    else:
        return usern[0]


def log_user_in(un):  # record that user is logged in
    ip = request.remote_addr  # user's current ip
    db_write("INSERT INTO stepify.logins (username, ip) VALUES ('" + un + "', '" + ip + "');")


def log_user_out(un):
    ip = request.remote_addr  # user's current ip
    # Check if user is logged in
    logged_in_uname = db_query("SELECT username FROM stepify.logins WHERE ip = '" + ip + "';",
                               "one")

    # if someone is logged in, fix the uname
    if logged_in_uname:
        logged_in_uname = logged_in_uname[0]

    # if logged in, log out
    if logged_in_uname == un:
        db_write("DELETE FROM stepify.logins WHERE username = '" + un + "' AND ip = '" + ip + "'")

    else:
        return redirect("/")


def process_login(u):
    if find_user_from_all_data(u) is None:  # if user in not registered
        return u['username'] + ' is not yet registered. <a href="signup">Sign up now</a>'
    else:
        uid = find_user_from_all_data(u)
        pw = db_query("SELECT password FROM stepify.users WHERE id = " + str(uid),
                      "one")[0]  # get correct password
        if pw == u['password']:  # if password is correct
            # Log user in
            log_user_in(u['username'])
            # Display welcome message
            return redirect('/')
        else:  # if password is wrong
            return 'Oops, wrong password. <a href="login">Back</a>'


def process_signup(u):
    if find_user_from_all_data(u) is None:
        # Sign user up
        db_write("INSERT INTO stepify.users (username, password) VALUES ('" + u['username'] + "', '" + u['password'] + "');")
        # Log user in
        log_user_in(u['username'])
        # Move on to choose your study program
        return redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + u['username'] + ' is already taken. <a href="/">Go back</a>'


def set_user_sp_and_tasks(study_program):
    un = check_login()
    # record user's study program
    db_write("UPDATE stepify.users SET study_program = '" + study_program + "' WHERE username = '" + un + "'")

    # set user's tasks based on study program

    # first get a list of tasks (as ids) relevant to this study program
    task_ids = db_query("SELECT id FROM stepify.tasks WHERE " + study_program + " = 'yes';",
                        "all")

    # then get user's id (in users table)
    user_id = find_user_from_uname(un)

    # then link the tasks to the user in the users_tasks table
    for task_id in task_ids:
        db_write("INSERT INTO stepify.users_tasks (user_id, task_id, completion) VALUES ('" + str(user_id) + "', '" + str(task_id[0]) + "', FALSE);")


# ROUTES ###

@app.route('/')
def stepify():
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
    return redirect("/")


@app.route('/choose-your-study-program', methods=['POST', 'GET'])
def sp():
    error = None
    if request.method == 'POST':
        p = request.form['study-program']
        set_user_sp_and_tasks(p)
        return redirect("/welcome")

    # the code below is executed if the request method was GET
    return render_template('studyprograms.html', error=error)


@app.route('/task-done', methods=['POST', 'GET'])
def task_done():
    error = None
    if request.method == 'POST':
        task_id = str(request.json)
        # mark task completion as yes in db
        # get user id
        uname = check_login()
        uid = str(find_user_from_uname(uname))

        db_write("UPDATE stepify.users_tasks SET completion = TRUE WHERE user_id = '" + uid + "' AND task_id = '" + task_id + "';")

    # the code below is executed if the request method was GET
    return render_template('404.html', error=error)


@app.route('/welcome')
def welcome():
    return render_template('welcome.html')


@app.route('/slack')
def slack():
    return render_template('slack.html')


@app.route('/google-calendar')
def calendar():
    return render_template('calendar.html')


@app.route('/code-wiki')
def wiki():
    return render_template('wiki.html')