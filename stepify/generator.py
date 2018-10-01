
import string
import random
import os.path


# Function that creates a random id, takes length as only param
def generate_char_id(size):
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for _ in range(size))


# Function to generate codes for cookies and pems - checks if file exists before it creates it
def generate_session_id():
    while True:
        # Create random code
        ident = generate_char_id(6)

        # Check if a file with that name already exists
        name = 'keys/' + ident + '_private_key.pem'
        if not os.path.isfile(name):
            return ident
