
# -*- coding: utf-8 -*-

# Creds for most of this code go to https://medium.com/@DannyAziz97/rsa-encryption-with-js-python-7e031cbb66bb

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Hash import SHA256
from base64 import b64decode
import os


# Create key set and return public key
def generate_keys(ident):

    # Create key pair
    key_pair = RSA.generate(1024)  # 1024 means the key size will be 1024 bits

    # write private key to file
    private_name = 'stepify/keys/privatekey_' + ident + '.pem'
    private_key = open(private_name, "wb+")
    private_key.write(key_pair.exportKey())
    private_key.close()

    # Return public key
    public_key = key_pair.publickey().exportKey()
    return public_key.decode("utf-8")


# Decipher encryption
def decrypt(s_id, pw):

    # get private key from file and convert to usable format
    key_file = 'stepify/keys/privatekey_' + s_id + '.pem'
    private_key = open(key_file, "r").read()
    os.remove(key_file)  # delete file
    key = RSA.importKey(private_key)
    cipher = PKCS1_OAEP.new(key, hashAlgo=SHA256)
    # decode from base64 and decrypt
    decrypted_message = cipher.decrypt(b64decode(pw))

    # convert from binary to normal string and return
    try:
        return decrypted_message.decode('utf-8')

    # Which doesn't actually work with non ascii characters. This is a bug.
    except:
        return """
            Oops... Well, this is embarrassing.<br><br>
            You have used an invalid character in your password.
            Sorry, this is a bug we are trying to fix.<br>
            For now, please just try again and don't use any non-ASCII characters in your password<br>
            Thank you!<br><br>
            <a href='/'>Go back</a>
    """
