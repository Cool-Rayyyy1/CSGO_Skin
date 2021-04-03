import requests
import mysql.connector



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
    count = 0
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


def getRandomTwenty():
    conn = mysql.connector.connect(host='localhost', user='root', passwd='19990522', database='myquotes')
    c = conn.cursor(buffered=True)
    c.execute('''SELECT * FROM SkinAll ORDER BY RAND()
    LIMIT 20;''')
    results = c.fetchall()
    return results


if __name__ == "__main__":
    getRandomTwenty()
