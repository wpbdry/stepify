
# -*- coding: utf-8 -*-

from flask import render_template, request
from stepify import app, signup_login


# Main page. Checks if user is logged in, and either sends to sign up or main page
@app.route('/')
def main_page():
    return signup_login.serve_signup_login()


# /signup. Begins sign up process
@app.route('/signup', methods=['POST', 'GET'])
def sign_up():
    error = None
    if request.method == 'POST':

        # Get cookie and form data
        session_id = request.cookies.get('sessionID')
        user_data = request.form

        # Return
        return signup_login.process_signup(session_id, user_data)

    # the code below is executed if the request method was GET
    return render_template('404.html', error=error)
