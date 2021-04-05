import json
import requests
import flask
from flask import request, Response

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# This file defines a API which is used to call the getInventory API
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

app.run()
