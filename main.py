import functions_framework
from google.cloud import storage
import json, collections
import os.path
import gcsfs
import re
import requests
import random
from datetime import date, datetime, time
from os import cpu_count
import pandas as pd
from pandas.io.parsers import read_csv
from io import StringIO
import os
import pathlib
import os
import zipfile
from collections import Counter
import pandas as pd
import hashlib
import base64
import calendar
import string
from random import *
import hmac
import random

def process(request,HttpResponse=None):
    try:        
        req_body = request.get_json()
    
        fn_type = req_body.get('type')
        query_type = req_body.get('queryType')
        extra = req_body.get('extra')
        record = req_body.get('record')
        
        if fn_type == "RapydAPI":            
            data = RapydAPI(query_type,record,extra)

    except:
        pass
    
    return (json.dumps(data,indent=4), 200)


@functions_framework.http
def analyze(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    data=[]
    db_params = json.loads(request.args['dbParams'])
    fn_type = db_params['type']
    
    if fn_type == "RapydAPI":
        data = RapydAPI(db_params)
   
    return (json.dumps(data,indent=4), 200,headers)

# def createSQLiteDB(db_params):
#     return {"Message":"Created SQLite db successfully!"}

def getSignature(method,url,payload):
    data=[]
    http_method = method                   # get|put|post|delete - must be lowercase
    base_url = 'https://sandboxapi.rapyd.net'          
    path=url.replace(base_url,"")         # Portion after the base URL. Hardkeyed for this example.

    # salt: randomly generated for each request.
    min_char = 8
    max_char = 12
    allchar = string.ascii_letters + string.punctuation + string.digits
    salt = "".join(choice(allchar)for x in range(randint(min_char, max_char)))

    # Current Unix time (seconds).
    d = datetime.utcnow()
    timestamp = calendar.timegm(d.utctimetuple())
    access_key = '3113773E2FB2EC4F1F21'        # The access key received from Rapyd.
    secret_key = 'ebd2ab68c09470d031ff79668f5123336a18227100b93eefa7513149b2164a96f4a1f0d0d305e474'        # Never transmit the secret key by itself.

    body = payload                             # JSON body goes here. Always empty string for GET; 
                                        # strip nonfunctional whitespace.

    to_sign = http_method + path + salt + str(timestamp) + access_key + secret_key + body

    h = hmac.new(bytes(secret_key, 'utf-8'), bytes(to_sign, 'utf-8'), hashlib.sha256)

    signature = base64.urlsafe_b64encode(str.encode(h.hexdigest()))

    headers = {
        'access_key': access_key,
        'signature': signature,
        'salt': salt,
        'timestamp': str(timestamp),
        'Content-Type': "application/json"
    }
    return headers


def RapydAPI(query_type,record,extra):
    
    if query_type == "get_countries":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/data/countries"
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "get_daily_rate": 
        print(query_type)
        # require buy ans sell currency details
        url = "https://sandboxapi.rapyd.net/v1/rates/daily?action_type=payment&buy_currency=" #need to add after string
        buy_currency = record.get('buy_currency')
        sell_currency= record.get('sell_currency')
        url = url+buy_currency+"&sell_currency="+sell_currency
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "list_currencies":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/data/currencies"
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive_raypd_pos_location":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/location/"  #add the pos_id
        pos_id = record.get('pos_id')
        url = url+pos_id
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_rapyd_pos_locations_by_coordinates":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/location?" #add longitude & latitude in url
        longitude = record.get('longitude')
        latitude = record.get('latitude')
        radius = record.get('radius')
        url = url+"latitude="+latitude+"&longitude="+longitude+"&radius="+radius
        print(url)
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "list_rapyd_pos_locations":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/location?page_size=2"
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status'] 
        else:
            return x

    if query_type == "list_rapyd_pos_locations_by_coordinates_cluster_based":
        print(query_type)
        # url = ""
        # payload={}
        # headers = getSignature('get',url,payload="")
        # response = requests.request("GET", url, headers=headers, data=payload)
        # x=json.loads(response.text)
        # # use four indents to make it easier to read the result:
        # return x
        return {"status":"Feature in development"}

    if query_type == "create_wallet":
        print(query_type)
        if record['type']=='person':
            url = "https://sandboxapi.rapyd.net/v1/user" 
            payload = json.dumps(record).replace(" ", "")                             #strip all whitespaces from json

            headers = getSignature('post',url,payload)
            response = requests.request("POST", url, headers=headers, data=payload) 

            x=json.loads(response.text)
            print(x)
            if x['status']['status'] != "SUCCESS":
                return x['status']
            elif x['status']['status'] == "SUCCESS":
                data = {}
                data['status'] = x['status']['status']
                data['ewallet_id'] = x['data']['id']
                data['contact_id'] = x['data']['contacts']['data'][0]['id']
                data['address_id'] = x['data']['contacts']['data'][0]['address']['id']
                return data
            else:
                return x
        if record['type'] == 'company':
            url = "https://sandboxapi.rapyd.net/v1/user"
            payload = json.dumps(record).replace(" ", "")
            headers = getSignature('post',url,payload)
            response = requests.request("POST", url, headers=headers, data=payload)
            x=json.loads(response.text)
            print(x)
            if x['status']['status'] != "SUCCESS":
                return x['status']
            elif x['status']['status'] == "SUCCESS":
                data = {}
                data['status'] = x['status']['status']
                data['ewallet_id'] = x['data']['id']
                data['contact_id'] = x['data']['contacts']['data'][0]['id']
                data['address_id'] = x['data']['contacts']['data'][0]['address']['id']
                data['business_id'] = x['data']['contacts']['data'][0]['business_details']['id']
                data['business_address_id'] = x['data']['contacts']['data'][0]['business_details']['address']['id']
                return data
            else:
                return x

    if query_type == "update":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user"
 
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('put',url,payload)
        response = requests.request("PUT", url, headers=headers, data=payload)
        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "disable":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/disable"
 
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('put',url,payload)
        response = requests.request("PUT", url, headers=headers, data=payload)
        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "enable":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/enable"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('put',url,payload)
        response = requests.request("PUT", url, headers=headers, data=payload)
        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        ewallet = record.get('ewallet')
        # print(ewallet)
        url = "https://sandboxapi.rapyd.net/v1/user/" + ewallet
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "delete":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        ewallet = record.get('ewallet')
        print(ewallet)
        url = "https://sandboxapi.rapyd.net/v1/user/" + ewallet
        payload={}
        headers = getSignature('delete',url,payload="")
        response = requests.request("DELETE", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "add_contact_to_wallet":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/ewallets/"
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/contacts"
        payload = json.dumps(record).replace(" ", "")                             #strip all whitespaces from json

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x 

    if query_type == "update_wallet_contact":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/ewallets/"
        extra_ewallet_id = extra.get('ewallet_id')
        extra_contact_id = extra.get('contact_id')
        url = url+extra_ewallet_id+"/contacts/"+extra_contact_id
        payload = json.dumps(record).replace(" ", "")                             #strip all whitespaces from json

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x 

    if query_type == "retrieve_wallet_contact":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/ewallets/"
        extra_ewallet_id = extra.get('ewallet_id')
        extra_contact_id = extra.get('contact_id')
        url = url+extra_ewallet_id+"/contacts/"+extra_contact_id
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x 
    
    if query_type == "list_contact_for_a_rapyd_wallet":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/ewallets/"
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/contacts"
        payload={}
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x 

    if query_type == "delete_wallet_contact":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/ewallets/"
        extra_ewallet_id = extra.get('ewallet_id')
        extra_contact_id = extra.get('contact_id')
        url = url+extra_ewallet_id+"/contacts/"+extra_contact_id
        payload={}
        headers = getSignature('delete',url,payload="")
        response = requests.request("DELETE", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "transfer_fund":
        print(query_type)
        if record['payment_method']=="between_wallets":
            url = "https://sandboxapi.rapyd.net/v1/account/transfer"
            payload = json.dumps(record).replace(" ", "") 
            headers = getSignature('post',url,payload)
            response = requests.request("POST", url, headers=headers, data=payload)
            x=json.loads(response.text)
            print(json.dumps(x,indent=4))
            if x['status']['status'] != "SUCCESS":
                return x['status']
            data=x['data']
            del data['metadata']
            del data['response_metadata']
            del data['destination_transaction_id']
            return data

        if record['payment_method']=="by_wallet":
            url = "https://sandboxapi.rapyd.net/v1/payments"
            payload = json.dumps(record).replace(" ", "")                            #strip all whitespaces from json
            headers = getSignature('post',url,payload)
            response = requests.request("POST", url, headers=headers, data=payload) 
            x=json.loads(response.text)
            if x['status']['status'] != "SUCCESS":
                return x['status']
            data=x['data']
            li=[]
            for key in data:
                if data[key] ==None or data[key] =="" or type(data[key])==list or type(data[key])==dict:
                    li.append(key)
            for each in li:
                del data[each]
            return data

    if query_type == "transfer_funds_between_wallet":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/account/transfer"
        payload = json.dumps(record).replace(" ", "") 
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload)
        x=json.loads(response.text)
        print(json.dumps(x,indent=4))
        if x['status']['status'] != "SUCCESS":
            return x['status']
        data=x['data']
        del data['metadata']
        del data['response_metadata']
        del data['destination_transaction_id']
        return data

    if query_type == "put_fund_on_hold":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/account/balance/hold"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x  

    if query_type == "release_on_hold_fund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/account/balance/release"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "set_wallet_account_limit":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        payload = json.dumps(record).replace(" ", "")                             
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/account/limits"
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "delete_wallet_account_limit":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        payload = json.dumps(record).replace(" ", "")                             
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/account/limits"
        headers = getSignature('delete',url,payload)
        response = requests.request("DELETE", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_wallet_transaction":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        payload = {}                             
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/transactions"
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
        
    if query_type == "list_wallet_transaction_by_type":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        payload = {}                             
        extra_ewallet_id = extra.get('ewallet_id')
        transaction_type = extra.get('transaction_type') #add_funds
        url = url+extra_ewallet_id+"/transactions?type="
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive_wallet_balance":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/user/"
        payload = {}                             
        extra_ewallet_id = extra.get('ewallet_id')
        url = url+extra_ewallet_id+"/accounts"
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "get_details_of_wallet_transaction":
        print(query_type)
        return {'status':"feature in development"}
        

    if query_type == "create_identity_verification_page": #use wallet sheet 
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/hosted/idv"  
        payload = json.dumps(record).replace(" ", "")                           
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents 
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "list_official_identification_documents":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/identities/types?country="
        country = extra.get('country')
        url = url+country
        payload = {}
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload)
        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "verify_identity": #image part have to see
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/identities"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "list_payout_method":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/supported_types?beneficiary_country="
        beneficiary_country = extra.get['beneficiary_country']
        payout_currency = extra.get['payout_currency']
        url = url+beneficiary_country+"&payout_currency="+payout_currency
        payload = {}                           

        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_payout":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        data=x['data']
        data['instructions']= data['instructions']['steps'][0]['step1']
        data['ewallets']= data['ewallets'][0]
        li=[]
        for key in data:
            if data[key] ==None or data[key] =="" or type(data[key])==list:
                li.append(key)
        for each in li:
            del data[each]
        return data
        
    if query_type == "create_payout_with_fx": # is source currency type & beneficiary currency type is not same
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "confirm_payout_with_fx":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/confirm/"
        payout_id = extra.get['payout_id']
        url = url+payout_id
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "update_payout":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/"
        payout_id = extra.get['payout_id']
        url = url+payout_id
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "complete_payout":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/complete/"
        payout_id = extra.get['payout_id']
        amount = extra.get['amount']
        url = url+payout_id+"/"+amount
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive_payout":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/"
        payout_id = extra.get['payout_id']
        url = url+payout_id
        payload = {}
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "cancel_payout":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/"
        payout_id = extra.get['payout_id']
        url = url+payout_id
        payload = {}
        headers = getSignature('delete',url,payload)
        response = requests.request("DELETE", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
        

    if query_type == "list_payout":
        print(query_type) 
        url = "https://sandboxapi.rapyd.net/v1/payouts?limit="
        payout_limit = extra.get['payout_limit']
        url = url+payout_id
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_sender":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/sender"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive_sender":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/sender/"
        sender_id = extra.get['sender_id']
        url = url+sender_id
        payload = {}
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "delete_sender":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/sender"
        sender_id = extra.get['sender_id']
        url = url+sender_id
        payload = {}
        headers = getSignature('delete',url,payload)
        response = requests.request("DELETE", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_beneficiary":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/beneficiary"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "validate_beneficiary_object": #send beneficiary json object in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/beneficiary/validate"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "validate_beneficiary_id": #send beneficiary_id in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/beneficiary/validate"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
        
    if query_type == "delete_beneficiary":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payouts/beneficiary/"
        beneficiary_id = extra.get['beneficiary_id']
        url = url+beneficiary_id
        payload = {}
        headers = getSignature('delete',url,payload)
        response = requests.request("DELETE", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_beneficiary_tokenization_page":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/hosted/disburse/beneficiary"
        payload = json.dumps(record).replace(" ", "")
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrive_beneficiary_id":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/hosted/disburse/beneficiary/"
        beneficiary_id = extra.get['beneficiary_id']
        url = url+beneficiary_id
        payload = {}
        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    # Point of sale 

    if query_type == "open_session":
        print(query_type)
        
    if query_type == "close_session":
        print(query_type)
        return

    if query_type == "echo_the_platform":
        print(query_type)
        return

    if query_type == "Deposite":
        print(query_type)
        return

    if query_type == "Pay":
        print(query_type)
        return

    if query_type == "use_paycode":
        print(query_type)
        return

    if query_type == "get_paycode_details":
        print(query_type)
        return

    if query_type == "withdraw":
        print(query_type)
        return

    if query_type == "reverse_withdrawal":
        print(query_type)
        return

    # Raypd Issuing

    if query_type == "issue_card": #only ewallet_id and country required in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards"
        payload = json.dumps(record).replace(" ", "")                            

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "issue_card_with_card_program": #only ewallet_id and card_program_id required in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "activate_issue_card_by_card_number": #only card_number required in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/activate"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "activate_issued_card_by_card_id": #only card_id required in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/activate"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "update_card_status_by_card_number": #card_number & status(block/unblock) in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/status"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "update_card_status_by_card_id": #card_id & status(block/unblock) in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/status"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "set_pin_code": #card_number & pin required in record
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/pin"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "personalize_issued_card_fail": #not working
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return {'status':'Feature in development'}

    if query_type == "list_issued_card":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/"
        payload ={}                             

        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrieve_issued_card_details": #card_number in extra
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/issuing/cards/"
        card_number = extra.get['card_number']
        url = url+card_number
        payload = {}                        

        headers = getSignature('get',url,payload)
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "display_issued_card_details_to_customer": #card_number in extra and json contain card details
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/hosted/issuing/card_details/"
        card_number = extra.ge['card_number']
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "simulate_a_card_adjustment":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "simulate_a_card_refund":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "simulate_a_card_authorization_request":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "simulate_a_card_authorization_reversal":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "list_issued_card_transaction":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "retrieve_issued_card_transaction_details":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "issue_bank_account_number_to_wallet":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "simulate_a_bank_transfer_to_a_wallet":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "retrieve_bank_account_history_for_wallet":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    # Raypd Collect

    if query_type == "credit_card":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payload = json.dumps(record).replace(" ", "")                             #strip all whitespaces from json

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        if x['status']['status'] != "SUCCESS":
            return x['status']
        elif x['status']['status'] == "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "debit_card":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payload = json.dumps(record).replace(" ", "")                             #strip all whitespaces from json

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        # use four indents to make it easier to read the result:
        return x
 
    if query_type == "bank_transfer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    
    if query_type == "cash":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "wallet":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "update_payment":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments/"
        payload = json.dumps(record).replace(" ", "")                             
        payment_id = extra.get['payment_id']
        url = url+payment_id
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_payment":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments"
        payment_limit = extra.get['payment_limit']
        url = url+payment_limit
        payload = { }                         

        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "create_group_payment":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments/group_payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)

        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "bank_transfer":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "create_group_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds/group_payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "create_partial_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds/group_payments"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "retrive_escrow":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments/"
        payment_id = extra.get('payment_id')
        escrow = extra.get('escrow') 
        url = url+payment_id+"/escrows/"+escrow
        payload = {}                            

        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "release_fund_escrow":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments/"
        payload = json.dumps(record).replace(" ", "")                             
        payment_id = extra.get('payment_id')
        escrow = extra.get['escrow'] 
        url = url+payment_id+"/escrows/"+escrow+"/escrow_releases"
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_escrow_release":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/payments/"
        payload = {}                           
        payment_id = extra.get('payment_id')
        escrow = extra.get('escrow') 
        url = url+payment_id+"/escrows/"+escrow+"/escrow_releases"
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "create_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "update_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds/"
        payload = json.dumps(record).replace(" ", "") 
        refund_id = extra.get('refund_id')
        url = url+refund_id
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "retrieve_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds/"
        payload = {}  
        refund_id = extra.get('refund_id') 
        url = url+refund_id		

        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_refund":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds/"
        payload = {}                             
        refund_id = extra.get('refund_id')
        url = url+refund_id		
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    
    if query_type == "list_refunds_by_payment_id":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/refunds"
        payload = {}                            
        payment_id = extra.get('payment_id') 
        url = url+payment_id		
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "create_customer_without_payment_method":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers"
        payload = json.dumps(record).replace(" ", "")                             
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 
        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_customer_with_payment_method":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers"
        payload = json.dumps(record).replace(" ", "")                             
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 
        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "update_customer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers/"                            
        customer_id = extra.get('customer_id')
        url = url+customer_id
        print(url)
        payload = json.dumps(record).replace(" ", "") 
        headers = getSignature('post',url,payload="")
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "retrieve_customer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers/"
        payload = {}                            
        customer_id = extra.get('customer_id')
        url = url+customer_id
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "list_customer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers"
        payload = {}                            
        
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "delete_customer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers/"
        payload = {}                             
        customer_id = extra.get('customer_id')
        url = url+customer_id
        headers = getSignature('delete',url,payload=" ")
        response = requests.request("DELETE", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "delete_discount_from_customer":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/customers/"
        payload = json.dumps(record).replace(" ", "")                             
        customer_id = extra.get('customer_id')
        url = url+customer_id+"/discount"
        headers = getSignature('delete',url,payload=" ")
        response = requests.request("DELETE", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    
    if query_type == "create_address":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_address":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "delete_address":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "add_payment_method_to_customer_card_by_id":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/"
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_payment_method_metadata":
        print(query_type)
        # url = "https://sandboxapi.rapyd.net/v1/"
        # payload = json.dumps(record).replace(" ", "")                             

        # headers = getSignature('',url,payload)
        # response = requests.request("", url, headers=headers, data=payload) 
        url = "https://sandboxapi.rapyd.net/v1/customers/cus_49496f51b286f84fa94122538c0f7e69/payment_methods/card_7bd0604ca358c404bd69669ba2a8f443"
        payload = json.dumps(
            { 
                "metadata": {
                    "merchant_defined": "Prime customer"
                }
            }
        )
        x=json.loads(response.text)
        print(x)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    
    if query_type == "update_payment_method_card_fields":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "retrieve_payment_method":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "list_payment_method_of_customer":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "delete_payment_method":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "list_payment_methods_by_country":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "get_payment_method_required_fields":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_token":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "create_bank_account_token":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "create_card_token":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "create_card_token_with_payment_method_type":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "create_card_token_without_payment_method_type":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "retrieve_token":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_product":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_product":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_product":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_product":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_product":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_sku":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_sku":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_sku":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_sku":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_sku":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_plan":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_plan":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_plan":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_plan":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_plan":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return
    
    if query_type == "update_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "start_a_new_cycle":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "complete_a_cycle":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "cancel_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_discount_from_subscription":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_subscription_item":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "update_subscription_item":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return    

    if query_type == "retrieve_subscription_item":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_subscription_item":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_subscription_item":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_usage_record":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_usgae_record":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_coupon":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "update_coupon":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_coupon":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_coupon":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_coupon":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "update_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "pay_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "delete_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_a_return_against_an_order":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_a_return":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "list_returns":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices"
        payload = json.dumps(record).replace(" ", "")                              
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "update_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id
        payload = json.dumps(record).replace(" ", "")                              
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x
    if query_type == "finalize_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id+"/finalize"
        payload = json.dumps(record).replace(" ", "")                              
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "pay_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id+"/pay"
        payload = json.dumps(record).replace(" ", "")                              
        headers = getSignature('post',url,payload)
        response = requests.request("POST", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "void_invoice":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "mark_invoice_uncollectible":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id
        payload = {}                              
        headers = getSignature('get',url,payload="")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "retrieve_upcoming_invoice":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_invoice_lines_from_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id+"/lines"
        payload = {}                              
        headers = getSignature('get',url,payload={})
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "list_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices?limit=3"
        payload = {}                              
        headers = getSignature('get',url,payload=" ")
        response = requests.request("GET", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "delete_invoice":
        print(query_type)
        url = "https://sandboxapi.rapyd.net/v1/invoices/"
        invoice_id = extra.get('invoice_id')
        url = url+invoice_id
        payload = {}                              
        headers = getSignature('delete',url,payload=" ")
        response = requests.request("DELETE", url, headers=headers, data={}) 

        x=json.loads(response.text)
        if x['status']['status'] != "SUCCESS":
            return x['status']
        else:
            return x

    if query_type == "create_checkout_page_for_customer":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "create_checkout_page_for_guest":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    if query_type == "retrieve_checkout_page":
        print(query_type)
        url = ""
        payload = json.dumps(record).replace(" ", "")                             

        headers = getSignature('',url,payload)
        response = requests.request("", url, headers=headers, data=payload) 

        x=json.loads(response.text)
        return

    