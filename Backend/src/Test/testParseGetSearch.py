# This file specifies how to test the parseGetSearch.py.
# Because this files only specifies one API, we need to use the postman to test the API

# Here are some examples to test the API

# This is a valid API
# 1. http://csgobackpack.net/api/GetItemPrice/, You need to enter the following parameters
#  Currency: USD, id:AK-47, Skin:Wasteland Rebel rarity:Battle-Scarred, time:7, icon:1
# Then the following response will be printed out: {"success":true,"average_price":"16.12","median_price":"16.1","amount_sold":"332","standard_deviation":"7.36","lowest_price":"11.6","highest_price":"21.3","first_sale_date":"1415833200","time":"7","icon":"http:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56P7fiDzRyTRDQCKJLSPAF9QO4Xhg67cZ1TZmy874FLV26s9fBMeN-M4tKH5KGWqCBbw776EJtg_IIfZDdpXu92im7JC5UDMMfh7dJ","currency":"USD"}

# This is an invalid API
# 2. http://csgobackpack.net/api/GetItemPrice/, if one of the required parameters are missing For example, Skin,
#  Currency: USD, id:AK-47,rarity:Battle-Scarred, time:7, icon:1
# Then the following response will be printed out:{message:"Please specify the Skin"}

# Can not find corresponding item
# 3.  http://csgobackpack.net/api/GetItemPrice/, You need to enter the following parameters
# Currency: USD, id:AK-47, Skin:lalalaalal, rarity:Battle-Scarred, time:7, icon:1
# Then the following response will be printed out {"message": "Please specify the id"}
