import os

f = open('users.txt', 'r')
usernames_with_quotes = f.read()
f.close()

usernames_without_quotes = usernames_with_quotes.replace('"', '')

f = open('users.txt', 'w')
f.write(usernames_without_quotes)
f.close()
