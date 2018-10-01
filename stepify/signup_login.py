
# -*- coding: utf-8 -*-

from flask import make_response, render_template
from stepify import dbconnect, generator, rsa


# Function to find a user by username and return id in users table
def find_user_by_uname(un):
    uid = dbconnect.query(
        "SELECT id FROM stepify.users WHERE username = %s;",
        (un,),
        "one"
    )

    # Deal with weird results nicely
    if uid:
        uid = uid[0]
    return uid


# Function to log a user in. Super securely
#def log_user_in(un):

    # Get an encrypted cookie from JS

    # Decrypt the cookie

    # Hash the cookie with salt and pepper

    # Store the hashed cookie in db


# Serve sign up page
def serve_signup_login():

    # Unique id, to identify this session among many users. This will be stored in a cookie and used in naming of keys
    session_id = generator.generate_session_id()

    # Generate key set for this session
    public_key = rsa.generate_keys(session_id)

    # Set cookie and return
    resp = make_response(render_template(
        'signup-login.html',
        key=public_key
    ))
    resp.set_cookie('sessionID', session_id)
    return resp


# Process signup
def process_signup(s_id, u):

    # Check if username already exists
    un = u['username']
    if not find_user_by_uname(un):

        # Decrypt password
        pw = rsa.decrypt(s_id, u['password'])

        # Register new user
        dbconnect.write(
            "INSERT INTO stepify.users (username, password) VALUES (%s, %s);",
            (un, pw,)
        )

        # Log user in
        #log_user_in(un)
        # Move on to choose your study program
        return 'Hi'  # redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + un + ' is already taken. <a href="/">Go back</a>'
