function create_invoice(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create Invoice","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_invoice",
    "type":"RapydAPI",
    "extra":{     },
    "record":{
      "customer": "cus_7a3674b1d6bd117104d5a4a969c23cd9",
      "billing": "pay_automatically",
      "days_until_due": null,
      "description": "",
      "due_date": 0,
      "metadata": {
        "merchant_defined": true
      },
      "statement_descriptor": "",
      "subscription": "",
      "tax_percent": "",
      "currency": "USD"
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
    ui.alert('Create Invoice',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create Invoice",error_code,"",message);
  }
  else{
    ui.alert('Create Invoice',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create Invoice","SUCCESS","Invoice created","");
  }
}

function update_invoice(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update Invoice","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_invoice",
    "type":"RapydAPI",
    "extra":{   
      "invoice_id":"invoice_60d9aa14dc4b390ab2bf87c82c9d7937"
      },
    "record":{
    "days_until_due": 40,
    "metadata": {
        "merchant_defined": "updated"
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
    ui.alert('Update Invoice',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Invoice",error_code,"",message);
  }
  else{
    ui.alert('Update Invoice',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Invoice","SUCCESS","Invoice updated","");
  }
}

function finalize_invoice(){
  
}

function pay_invoice(){
  
}

function void_invoice(){
  
}

function mark_invoice_uncollectible(){
  
}

function retrieve_invoice(){
  
}

function retrieve_upcoming_invoice(){
  
}

function list_invoice(){
  
}

function delete_invoice(){
  
}