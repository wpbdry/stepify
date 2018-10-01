
# -*- coding: utf-8 -*-

from stepify import app
import signup_login


@app.route('/')
def stepify():
    return 'Hello World!'
