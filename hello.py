
# SETUP ###

import psycopg2
from flask import Flask, request, render_template, redirect
app = Flask(__name__)

# CONNECT TO DB ###

# Connect to an existing database
conn = psycopg2.connect(host="localhost", port="5433", dbname="stepify", user="postgres", password="password")

# PREDEFINED FUNCTIONS ###


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
            cur = conn.cursor()
            cur.execute("SELECT firstname FROM stepify.users WHERE id = " + str(uid))
            firstname = cur.fetchone()[0]
            cur.close()
            return 'Welcome back, ' + firstname + '. <a href="logout">Logout</a>'
        else:  # if password is wrong
            return 'Oops, wrong password. <a href="login">Back</a> <a href="signup>Sign up</a>'


def process_signup(u):
    if find_user(u) is None:
        # Sign user up
        cur = conn.cursor()
        cur.execute("INSERT INTO stepify.users (username, password) VALUES (%s, %s)", (u['username'], u['password']))
        conn.commit()
        cur.close()
        # Log user in
        log_user_in(u['username'])
        # Display welcome message
        return redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + u['username'] + ' is already taken. <a href="signup">Go back</a>'


def show_main_page():
    return 'You are logged in as ' + check_login() + '. <a href="logout">Log out</a>'
    

# ROUTES ###

@app.route('/')
def hello_world():
    if check_login() is False:
        return render_template('signup-login.html')
    else:
        return show_main_page

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
        un = check_login()
        cur = conn.cursor()
        cur.execute("UPDATE stepify.users SET study_program = '" + p + "' WHERE username = '" + un + "'")
        conn.commit()
        cur.close()
        return show_main_page()

    # the code below is executed if the request method was GET
    return render_template('studyprograms.html', error=error)
