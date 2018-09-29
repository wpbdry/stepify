
import rsa


# Process signup
def process_signup(u):
    return rsa.decrypt(u['password'])


    """
    un = u['username']
    if find_user_from_uname(un) is None:
        # Sign user up
        dbconnect.write(
            "INSERT INTO stepify.users (username, password) VALUES ('"
            + un + "', '" + u['password'] + "');")
        # Log user in
        log_user_in(un)
        # Move on to choose your study program
        return redirect("/choose-your-study-program")
    else:
        return 'Sorry, ' + un + ' is already taken. <a href="/">Go back</a>'
    """