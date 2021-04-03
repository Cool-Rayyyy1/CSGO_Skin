import requests
import flask
from flask import request, Response
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True


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
        firstUrl = "http://csgobackpack.net/api/GetItemPrice/?currency=" + inputCurrency + "&id=" + inputId
        finalUrl = firstUrl + "%20|%20" + inputSkin + "%20(" + inputRarity + ")&time=" + inputTime + "&icon=" + inputIcon
        response = requests.get(finalUrl)
        return response.json()
    except Exception as e:
        return str(e)


app.run()
