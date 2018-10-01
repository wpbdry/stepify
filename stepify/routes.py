
# -*- coding: utf-8 -*-

from stepify import app



@app.route('/')
def stepify():
    return 'Hello World!'
