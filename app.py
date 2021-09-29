from flask import Flask, render_template, redirect
from flask import request
import requests
import json
import sys
import os

apipub= os.getenv("APIPUB")
apipriv = os.getenv("APIPRIV")
app = Flask(__name__)


@app.route ('/')
def go_home():
    return redirect('/checkout')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')


@app.route('/confirm', methods=['POST'])
def confirm():
    token = request.json['checkout_token']
    order_id = request.json['order_id']
    ##AUTHORIZE
    url = "https://sandbox.affirm.com/api/v1/transactions"
    headers = {"Accept": "*/*", "Content-Type": "application/json"}
    data = {'transaction_id': token, 'order_id': order_id}
    response = requests.request("POST", url, headers=headers,
                                auth=(apipub, apipriv),
                                data=json.dumps(data))
    ##CAPTURE
    trans_id = response.json()['id']
    capture_url = "https://sandbox.affirm.com/api/v1/transactions/" + trans_id + "/capture"
    response = requests.request("POST", url, headers=headers,
                                auth=(apipub, apipriv),
                                data=json.dumps(data))

    return redirect('/success')


@app.route('/success', methods=['GET', 'POST'])
def success():
    return render_template('success.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
