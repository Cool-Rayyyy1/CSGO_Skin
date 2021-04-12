# This file specifies how to test the parseGetInventory.py.
# Because this files only specifies one API, we need to use the postman to test the API

# Here are some examples to test the API

# This is a valid id, {"success":true,"value":"16965.24","items":"734","currency":"USD"} should be printed out
# 1. http://127.0.0.1:5000/api/getInventory  enter the id: 76561197961511127

# This is a invalid id, {"success": "false"} should be printed out
# 2. http://127.0.0.1:5000/api/getInventory  enter the id: 12312321

# No id, {"message": "Please specify the id"} should be printed out
# 3. http://127.0.0.1:5000/api/getInventory, do not enter id
