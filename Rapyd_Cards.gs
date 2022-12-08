function credit_card_1() {
  const  ui = SpreadsheetApp.getUi();

  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Collect->Payment');
  
  var raw_json = JSON.stringify(  
  { "queryType" : "credit_card",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
        "amount": "",
        "currency": "",
        "description": "payment by card",
        "capture": true,
        "payment_method": {
          "type": "at_visa_card",
          "fields": {
            "name": "John Doe",
            "number": "5188340000000060",
            "expiration_month": "04",
            "expiration_year": "23",
            "cvv": "150"
            }
          },
        "payment_method_options": {
        "3d_required": false
        },
        "payment_options": {},
        "ewallets": [
          {
          "ewallet": "",
          "percentage": 100
          }
        ],
        "metadata": {
          "merchant_defined": "created"
        }
      }
    }
  );
  var selected_range = sheet.getActiveRange();
  var selected = selected_range.getValues();
  if (selected.length === 0) {
    throw new Error("No row selected.");
  }
  if (selected.length > 1) {
    throw new Error("Many row's selected.");
  }
  if(selected[0].length != sheet.getLastColumn()){
    throw new Error("Please select the row properly")
  }
  else{
    if(selected[0][0] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["amount"] = selected[0][2];
      raw1["record"]["currency"] = selected[0][3];
      raw1["record"]["ewallets"][0]["ewallet"] = selected[0][0];
      raw_json = JSON.stringify(raw1);
      Logger.log(raw_json)

      var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

      var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

      var response = UrlFetchApp.fetch(request, requestOptions)
      
      if(response != false){
        var json = response.getContentText();
      }
      ui.alert(''+response+'');

    }
  }

}

//-------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------------------------

function debit_card_2() {
  const  ui = SpreadsheetApp.getUi();

  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Collect->Payment');
  
  var raw_json = JSON.stringify(  
  { "queryType" : "debit_card",
    "type":"RapydAPI",
    "extra":{    },
    "record":{
      "payment_method": {
        "type": "us_debit_visa_card",
        "fields": {  }
      },
      "customer": "",
      "payment_method_options": { },
      "metadata": {
        "merchant_defined": "created"
      },
        "amount": "",
        "ewallet": "",
        "currency": ""
      }
  }  
  );
  var selected_range = sheet.getActiveRange();
  var selected = selected_range.getValues();
  if (selected.length === 0) {
    throw new Error("No row selected.");
  }
  if (selected.length > 1) {
    throw new Error("Many row's selected.");
  }
  if(selected[0].length != sheet.getLastColumn()){
    throw new Error("Please select the row properly")
  }
  else{
    if(selected[0][0] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["amount"] = selected[0][2];
      raw1["record"]["currency"] = selected[0][3];
      raw1["record"]["ewallet"] = selected[0][0];
      raw1["record"]["payment_method"]["fields"] = JSON.parse(String(selected[0][5].replace(/(\r\n|\n|\r)/gm,"")));
      raw1["record"]["payment_method_options"]= JSON.parse(String(selected[0][6].replace(/(\r\n|\n|\r)/gm,"")));
      raw_json = JSON.stringify(raw1);
      Logger.log(raw_json)

      var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

      var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

      var response = UrlFetchApp.fetch(request, requestOptions)
      
      if(response != false){
        var json = response.getContentText();
      }
      ui.alert(''+response+'');

    }
  }

}

//---------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------

function credit_card(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Payment using credit card","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "credit_card",
    "type":"RapydAPI",
    "extra":{ },
    "record":{
      "amount": 1,
      "currency": "INR",
      "customer": "cus_9d258404bc5562d25d113d10bb292c8f",
      "payment_method": {
        "type": "in_amex_card",
        "fields": {
          "number": "4111111111111111",
          "expiration_month": "12",
          "expiration_year": "23",
          "name": "John Doe",
          "cvv": "345"
        },
        "metadata": {
        "merchant_defined": true
      }
      },
      "capture": true
      }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Payment using credit card',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using credit card",error_code,"",message);
  }
  else{
    ui.alert('Payment using credit card',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using credit card","SUCCESS","Payment using credit card completed","");
  }
}

function debit_card(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Payment using debit card","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "debit_card",
    "type":"RapydAPI",
    "extra":{ },
    "record":
    {
	"amount": 1,
	"currency": "USD",
	"customer": "cus_9d258404bc5562d25d113d10bb292c8f",
	"payment_method": {
		"type": "in_amex_card",
		"fields": {
			"number": "411111111111",
			"expiration_month": "12",
			"expiration_year": "23",
			"name": "John Doe",
			"cvv": "345"
		},
		"metadata": null
	},
	"capture": true,
    "3DS_requirede": true
  }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Payment using debit card',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using debit card",error_code,"",message);
  }
  else{
    ui.alert('Payment using debit card',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using debit card","SUCCESS","Payment using debit card completed","");
  }
}

function bank_transfer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Payment using bank transfer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "bank_transfer",
    "type":"RapydAPI",
    "extra":{ },
    "record":
    {
    "amount": 1,
    "currency": "SGD",
    "customer": "cus_9d258404bc5562d25d113d10bb292c8f",
    "payment_method": {
        "type": "sg_fast_bank"
    },
    "description": "Payment by bank transfer1",
    "statement_descriptor": "********LLL",
    "metadata": {
        "merchant_defined": true
    }
  }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Payment using bank transfer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using bank transfer",error_code,"",message);
  }
  else{
    ui.alert('Payment using bank transfer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using bank transfer","SUCCESS","Payment using bank transfer completed","");
  }
}

function cash(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Payment using cash","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "cash",
    "type":"RapydAPI",
    "extra":{ },
    "record":
    {
    "amount": 1,
    "currency": "CRC",
    "payment_method": {
        "type": "cr_palistores_cash"
    }
  }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Payment using cash',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using cash",error_code,"",message);
  }
  else{
    ui.alert('Payment using cash',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using cash","SUCCESS","Payment using cash completed","");
  }
}

function wallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Payment using wallet","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "wallet",
    "type":"RapydAPI",
    "extra":{ },
    "record":
    {
    "amount": 1,
    "currency": "IDR",
    "payment_method": {
        "type": "id_ovo_ewallet",
        "fields": {
        "phone":"+651111111111"
    }
    
  }
  }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Payment using wallet',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using wallet",error_code,"",message);
  }
  else{
    ui.alert('Payment using wallet',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Payment using wallet","SUCCESS","Payment using wallet completed","");
  }
}


//--------------------xxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------

function update_payment(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update payment","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "wallet",
    "type":"RapydAPI",
    "extra":{ 
      "payment_id":"payment_e2ebec4e11b4d0ca04379fffa9b1151c"
    },
    "record":
    {
    "receipt_email": "",
    "description": "",
    "address": {
        "name": "John Doe",
        "line_1": "123 Main Street",
        "line_2": "Penthouse",
        "line_3": "",
        "city": "Anytown",
        "state": "NY",
        "country": "US",
        "zip": "12345",
        "phone_number": "16125551234",
        "metadata": {
            "merchant_defined": "updates-2021"
        },
        "canton": "",
        "district": ""
    }
  }
    }
  );
  var raw1 = JSON.parse(raw_json);
  raw_json = JSON.stringify(raw1);
  Logger.log(raw_json)
  var requestOptions = {
        'method': 'POST',
        'headers': { 
            "Api-Token": "API TOKEN",
            "Content-Type": "application/json",
            "Cookie": "COOKIE"
          },
        'payload': raw_json
      };

  var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

  var response = UrlFetchApp.fetch(request, requestOptions)
  Logger.log(response)
  var results = JSON.parse(response);
  var status = results["status"]
  if(status === "ERROR"){
    var error_code = results["error_code"]
    var message = results["message"]
    ui.alert('Update payment',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update payment",error_code,"",message);
  }
  else{
    ui.alert('Update payment',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update payment","SUCCESS","Payment updated","");
  }
}

