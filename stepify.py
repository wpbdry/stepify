
# SETUP ###

from flask import Flask, render_template, request, redirect, Response, jsonify
import dbconnect

app = Flask(__name__)


# PREDEFINED FUNCTIONS ###

# Find user data


def find_user_from_uname(un):  # finds user by username and returns id
    uid = dbconnect.query("SELECT id FROM stepify.users WHERE username = %;",
                          (un,),
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
    tasks = dbconnect.query_json(open("get-tasks.sql", "r").read(), (uid,))
    # get data for progress bar
    total_tasks = dbconnect.query("SELECT COUNT(id) FROM stepify.users_tasks WHERE user_id = %;",
                                  (str(uid),),
                                  "one")[0]
    done_tasks = dbconnect.query("SELECT COUNT(id) FROM stepify.users_tasks WHERE user_id = % AND completion = TRUE;",
                                 (str(uid),),
                                 "one")[0]

    # load page and send task info to js
    # also send completed tasks and total tasks to that front end can calculate progress
    return render_template(
        "main.html",
        tasks=tasks,
        username=check_login(),
        total_tasks=total_tasks,
        done_tasks=done_tasks
    )


# Login / sign up functionality


def check_login():  # Returns username if user is logged in and returns False if not
    uip = request.remote_addr  # user's current ip
    usern = dbconnect.query("SELECT username FROM stepify.logins WHERE ip = %;",
                            (uip,),
                            "one")
    if usern is None:
        return False
    else:
        return usern[0]


def log_user_in(un):  # record that user is logged in
    ip = request.remote_addr  # user's current ip
    dbconnect.write("INSERT INTO stepify.logins (username, ip) VALUES (%, %);",
                    (un, ip,))


def log_user_out(un):
    ip = request.remote_addr  # user's current ip
    # Check if user is logged in
    logged_in_uname = dbconnect.query("SELECT username FROM stepify.logins WHERE ip = %;",
                                      (ip,),
                                      "one")

    # if someone is logged in, fix the uname
    if logged_in_uname:
        logged_in_uname = logged_in_uname[0]

    # if logged in, log out
    if logged_in_uname == un:
        dbconnect.write("DELETE FROM stepify.logins WHERE username = % AND ip = %;",
                        (un, ip,))

    else:
        return redirect("/")


def process_login(u):
    un = u['username']
    if find_user_from_uname(un) is None:  # if user in not registered
        return un + ' is not yet registered. <a href="signup">Sign up now</a>'
    else:
        uid = find_user_from_uname(un)
        pw = dbconnect.query("SELECT password FROM stepify.users WHERE id = %;",
                             (str(uid),),
                             "one")[0]  # get correct password
        if pw == u['password']:  # if password is correct
            # Log user in
            log_user_in(un)
            # Display welcome message
            return redirect('/')
        else:  # if password is wrong
            return 'Oops, wrong password. <a href="login">Back</a>'


def process_signup(u):
    un = u['username']
    if find_user_from_uname(un) is None:
        # Sign user up
        dbconnect.write(
            "INSERT INTO stepify.users (username, password) VALUES (%, %);",
            (un, u['password'],))
        # Log user in
        log_user_in(un)
        # Move on to choose your study program
        return redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + un + ' is already taken. <a href="/">Go back</a>'


def set_user_sp_and_tasks(study_program):
    un = check_login()
    # record user's study program
    dbconnect.write("UPDATE stepify.users SET study_program = % WHERE username = %;",
                    (study_program, un,))

    # set user's tasks based on study program

    # first get a list of tasks (as ids) relevant to this study program
    task_ids = dbconnect.query("SELECT id FROM stepify.tasks WHERE % = TRUE;",
                               (study_program,),
                               "all")

    # then get user's id (in users table)
    user_id = find_user_from_uname(un)

    # then link the tasks to the user in the users_tasks table
    for task_id in task_ids:
        dbconnect.write(
            "INSERT INTO stepify.users_tasks (user_id, task_id, completion) VALUES (%, %, FALSE)",
            (str(user_id), str(task_id[0]),))


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
        return redirect("/slack")

    # the code below is executed if the request method was GET
    return render_template('studyprograms.html', error=error)


@app.route('/task-done', methods=['POST', 'GET'])
def task_done_id():
    error = None
    if request.method == 'POST':
        task_data = request.json
        # mark task completion as yes in db
        # get user id
        uname = check_login()
        uid = str(find_user_from_uname(uname))

        dbconnect.write(
            "UPDATE stepify.users_tasks SET completion = TRUE, completion_date = TIMESTAMP % WHERE user_id = % AND task_id = %;",
            (task_data['compdate'], uid, task_data['taskid'],))

    # the code below is executed if the request method was GET
    return render_template('404.html', error=error)


@app.route('/task-undone', methods=['POST', 'GET'])
def task_undone():
    error = None
    if request.method == 'POST':
        task_id = str(request.json)
        # mark task completion as yes in db
        # get user id
        uname = check_login()
        uid = str(find_user_from_uname(uname))

        dbconnect.write(
            "UPDATE stepify.users_tasks SET completion = FALSE WHERE user_id = % AND task_id = %;",
            (uid, task_id,))

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
