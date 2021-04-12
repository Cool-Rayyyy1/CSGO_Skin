# This file specifies how to test the parseGetAll.py.
# This file defines the def to store data in the database and a API to get random results, we can not use code to directly test it

# First, we need to test the is the def function for callAPI, we first need to comment app.run() at the end, and run that file
# Then if we open the mysql database, we should be able to see the data in the table for skinAll

# Next, we could  use the postman to test the API. We first need to erase the comment for the app.run() to run the server
# Next, we open the postman and enter http://127.0.0.1:5000/api/getTwenty, the random 20 items should appeared.
# if you run the API again, different 20 items should be printed out. And the def get getRandomTwenty is used for debugging


# At the end, you should not try call the API if you do not store the data in the database, errors will occur if you do that.
# If you revise or create a new database, you should revise the code to ensure the mySQl connector could connect the database
