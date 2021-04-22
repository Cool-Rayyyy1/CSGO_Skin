# This file specifies how to test the parseGetResult api
# Because this files only specifies one API, we need to use the postman to test the API

# Here are some examples to test the API

# This is a valid API
# 1. http://127.0.0.1:5000/api/getPic?avg=20&sd=10&num=20&median=30, You need to enter the following parameters
# Then the following response will be printed out: A picture should be saved, and a dict with decision and predicted value should be returned

# This is an invalid API
# 2. http://127.0.0.1:5000/api/getPic?avg=20&sd=10&num=20, if one of the required parameters are missing For example, median,
# Then the following response will be printed out:{message:"Please specify the median"}

# This is an invalid API
# 3. http://127.0.0.1:5000/api/getPic?avg=20&sd=10&median=30, if one of the required parameters are missing For example, num
# Then the following response will be printed out {"message": "Please specify the num"}
