
# Creds for most of this code go to https://medium.com/@DannyAziz97/rsa-encryption-with-js-python-7e031cbb66bb

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Hash import SHA256
from base64 import b64decode


# Create key set and return public key
def create_keys():

    # Create key pair
    key_pair = RSA.generate(1024) # 1024 means the keysize will be 1024 bits

    # write private key to file
    private_key = open("private-key.pem", "wb")
    private_key.write(key_pair.exportKey())
    private_key.close()

    # write puclic key to file
    public_key = open("public-key.pem", "wb")
    public_key.write(key_pair.publickey().exportKey())
    public_key.close()

    # return public key
    return open("public-key.pem", "r").read()


# Decipher encryption
def decrypt(s):

    # get private key from file and convert to usable format
    private_key = open("private-key.pem", "r").read()
    key = RSA.importKey(private_key)

    # decrypt
    cipher = PKCS1_OAEP.new(key, hashAlgo=SHA256)

    # decode from base64
    decrypted_message = cipher.decrypt(b64decode(s))

    # convert back to normal string and return
    try:
        return decrypted_message.decode('utf-8')
    # Which doesn't work with all characters. This is a bug.
    except:
        return """
            Oops... well, this is embarrassing.<br><br>
            You have used an invalid character in your password.
            Sorry, this is a bug we are trying to fix.<br>
            For now, please just try again and don't use any character in your password
            that you think might have cause this error.<br>
            Thank you!<br><br>
            <a href='/'>Go back</a>
    """
