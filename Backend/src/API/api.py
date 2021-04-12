import mysql.connector
import flask
import json
import requests
from flask import request, Response

# These functions are used to avoid compiler errors if the item does not have corresponding errors
def getName(item):
    try:
        return item["name"]
    except:
        return "item name does not exist"


def getUrl(item):
    try:
        return "http://cdn.steamcommunity.com/economy/image/" + item["icon_url"]
    except:
        return "item url does not exist"


def getRarity(item):
    try:
        return item["rarity"]
    except:
        return "item rarity does not exist"


def getPrice(item):
    try:
        price = item["price"]
        price24 = price["24_hours"]
        return (price24["average"], price24["sold"])
    except:
        return "item price does not exist"

# This def is used to call the API and create table in the mysql database and store those values
def callAPI():
    # First connect to the sql server and get the data
    conn = mysql.connector.connect(host='localhost', user='root', passwd='19990522', database='myquotes')
    c = conn.cursor(buffered=True)
    c.execute('''DROP TABLE SkinAll''')
    c.execute('''CREATE TABLE SkinAll(
                name VARCHAR(99) NOT NULL PRIMARY KEY, 
                icon_url VARCHAR(2083), 
                rarity VARCHAR(255),
                AveragePrice VARCHAR(255),
                AverageSold VARCHAR(255)
        )''')

    response = requests.get("http://csgobackpack.net/api/GetItemsList/v2/")
    results = response.json()
    itemList = results["items_list"]
    allItems = []
    for item in itemList.items():
        allItems.append(item[1])
    for i in range(len(allItems)):
        currentItem = allItems[i]
        itemName = getName(currentItem)
        itemUrl = getUrl(currentItem)
        itemRarity = getRarity(currentItem)
        itemPrice = getPrice(currentItem)
        c.execute('''INSERT INTO SkinAll VALUES(%s,%s,%s,%s,%s)''', (
            itemName, itemUrl, itemRarity, str(itemPrice[0]), str(itemPrice[1])))
        conn.commit()

# This function is used to run in this file which are used to check the values that we got from the API
def getRandomTwenty():
    conn = mysql.connector.connect(host='localhost', user='root', passwd='19990522', database='myquotes')
    c = conn.cursor(buffered=True)
    c.execute('''SELECT * FROM SkinAll ORDER BY RAND()
    LIMIT 20;''')

    allColumns = [col[0] for col in c.description]
    skins = [dict(zip(allColumns, row)) for row in c.fetchall()]
    jsonAllSkins = json.dumps(skins)
    return jsonAllSkins


app = flask.Flask(__name__)
app.config["DEBUG"] = True

# This API returns a random 20 items that stored previously in the database
@app.route('/api/getTwenty', methods=['GET'])
def api_getTwentyDefault():
    conn = mysql.connector.connect(host='localhost', user='root', passwd='19990522', database='myquotes')
    c = conn.cursor(buffered=True)
    c.execute('''SELECT * FROM SkinAll ORDER BY RAND()
       LIMIT 20;''')
    allColumns = [col[0] for col in c.description]
    skins = [dict(zip(allColumns, row)) for row in c.fetchall()]
    jsonAllSkins = json.dumps(skins)
    return jsonAllSkins



# This api defines a API which is used to call the getInventory API
@app.route('/api/getInventory', methods=['GET'])
def api_get_Inventory():
    # checks for the input id
    inputId = request.args.get('id')
    if inputId is None:
        return Response(response=json.dumps(dict(message="Please specify the id")),
                        status=400)
    try:
        url = "http://csgobackpack.net/api/GetInventoryValue/?id=" + inputId
        response = requests.get(url)
        return response.json()
    except Exception as e:
        return str(e)



# This api also defines a API which is used to call the search API. This API also checks for the required 6 parameters.
@app.route('/api/getSearch', methods=['GET'])
def api_get_authorID():
    inputId = request.args.get('id')
    if inputId is None:
        return Response(response=json.dumps(dict(message="Please specify the id")),
                        status=400)
    inputCurrency = request.args.get('Currency')

    if inputCurrency is None:
        return Response(response=json.dumps(dict(message="Please specify the currency")),
                        status=400)
    inputSkin = request.args.get('Skin')
    if inputSkin is None:
        return Response(response=json.dumps(dict(message="Please specify the Skin")),
                        status=400)
    inputRarity = request.args.get('Rarity')
    if inputRarity is None:
        return Response(response=json.dumps(dict(message="Please specify the Rarity")),
                        status=400)
    inputIcon = request.args.get('icon')
    if inputIcon is None:
        return Response(response=json.dumps(dict(message="Please specify the Icon")),
                        status=400)
    inputTime = request.args.get('time')
    if inputTime is None:
        return Response(response=json.dumps(dict(message="Please specify the Time")),
                        status=400)
    try:
        inputId = str(inputId.replace(" ", "%20"))
        inputCurrency = str(inputCurrency.replace(" ", "%20"))
        inputSkin = str(inputSkin.replace(" ", "%20"))
        inputRarity = str(inputRarity.replace(" ", "%20"))
        inputIcon = str(inputIcon.replace(" ", "%20"))
        inputTime = str(inputTime.replace(" ", "%20"))
        # concate the url
        firstUrl = "http://csgobackpack.net/api/GetItemPrice/?currency=" + inputCurrency + "&id=" + inputId
        finalUrl = firstUrl + "%20|%20" + inputSkin + "%20(" + inputRarity + ")&time=" + inputTime + "&icon=" + inputIcon
        response = requests.get(finalUrl)
        return response.json()
    except Exception as e:
        return str(e)


app.run()