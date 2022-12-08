function retrive_escrow(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrive Escrow","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrive_escrow",
    "type":"RapydAPI",
    "extra":{
      "payment_id":"payment_8462a44197d902506013ad7c71e93b62",
      "escrow_id": "escrow_d53f403ca09ff862ce3351c910a3aef8"
     },
    "record":{}  
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
    ui.alert('Retrive Escrow',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrive Escrow",error_code,"",message);
  }
  else{
    ui.alert('Retrive Escrow',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrive Escrow","SUCCESS","Retrived Escrow","");
  }
}

function release_fund_escrow(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Release fund from escrow","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "release_fund_escrow",
    "type":"RapydAPI",
    "extra":{
      "payment_id":"payment_8462a44197d902506013ad7c71e93b62",
      "escrow_id": "escrow_d53f403ca09ff862ce3351c910a3aef8"
     },
    "record":{}  
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
    ui.alert('Release fund from escrow',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Release fund from escrow",error_code,"",message);
  }
  else{
    ui.alert('Release fund from escrow',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Release fund from escrow","SUCCESS","Released fund from escrow","");
  }
}

function list_escrow_release(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Escrow release","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_escrow_release",
    "type":"RapydAPI",
    "extra":{
      "payment_id":"payment_8462a44197d902506013ad7c71e93b62",
      "escrow_id": "escrow_d53f403ca09ff862ce3351c910a3aef8"
     },
    "record":{}  
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
    ui.alert('List Escrow release',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Escrow release",error_code,"",message);
  }
  else{
    ui.alert('List Escrow release',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Escrow release","SUCCESS","Listed Escrow release","");
  }
}

//---------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------------------------

function create_refund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create refund","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_refund",
    "type":"RapydAPI",
    "extra":{     },
    "record":{
    "payment": "payment_91cc9e604c10923893e1e325c54f1811"
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
    ui.alert('Create refund',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create refund",error_code,"",message);
  }
  else{
    ui.alert('Create refund',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create refund","SUCCESS","Refund created","");
  }
}

function update_refund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update refund","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_refund",
    "type":"RapydAPI",
    "extra":{  
      "refund_id":"refund_4a582ae204452beee434d3ca9e129a7b"
       },
    "record":{
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
    ui.alert('Update refund',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update refund",error_code,"",message);
  }
  else{
    ui.alert('Update refund',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update refund","SUCCESS","Refund updated","");
  }
}

function retrieve_refund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve refund","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_refund",
    "type":"RapydAPI",
    "extra":{  
      "refund_id":"refund_4a582ae204452beee434d3ca9e129a7b"
       },
    "record":{} 
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
    ui.alert('Retrieve refund',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve refund",error_code,"",message);
  }
  else{
    ui.alert('Retrieve refund',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve refund","SUCCESS","Refund retrieved","");
  }
}

function complete_refund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Compltete refund","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "complete_refund",
    "type":"RapydAPI",
    "extra":{       },
    "record":{
      "token": "refund_f3b10bf92a05f56fc3c07fc8a1f8856c"
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
    ui.alert('Compltete refund',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Compltete refund",error_code,"",message);
  }
  else{
    ui.alert('Compltete refund',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Compltete refund","SUCCESS","Refund completed","");
  }
}

function list_refund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List refund","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_refund",
    "type":"RapydAPI",
    "extra":{  
      "limit":"2"
       },
    "record":{} 
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
    ui.alert('List refund',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List refund",error_code,"",message);
  }
  else{
    ui.alert('List refund',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List refund","SUCCESS","Refund listed","");
  }
}

function list_refunds_by_payment_id(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Refunds by Payment ID","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_refunds_by_payment_id",
    "type":"RapydAPI",
    "extra":{  
      "payment_id":"payment_91cc9e604c10923893e1e325c54f1811"
       },
    "record":{} 
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
    ui.alert('List Refunds by Payment ID',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Refunds by Payment ID",error_code,"",message);
  }
  else{
    ui.alert('List Refunds by Payment ID',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Refunds by Payment ID","SUCCESS","Refund listed by payment ID","");
  }
}


//----------------------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxx------------------------------
function delete_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "delete_customer",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_5b66f7253de61ae20abc6350f3a5e52d"
       },
    "record":{} 
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
    ui.alert('Delete customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete customer",error_code,"",message);
  }
  else{
    ui.alert('Delete customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete customer","SUCCESS","Customer deleted","");
  }
}

function create_customer_without_payment_method(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create customer without payment method","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_customer_without_payment_method",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "business_vat_id": "123456789",
    "email": "johndoe@rapyd.net",
    "ewallet": "ewallet_bb5a1134929a033f02c47a3c7dec45d8",
    "invoice_prefix": "JD-",
    "metadata": {
    	"merchant_defined": true
    },
    "name": "John Doe",
    "phone_number": "+14155559993"
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
    ui.alert('Create customer without payment method',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create customer without payment method",error_code,"",message);
  }
  else{
    ui.alert('Create customer without payment method',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create customer without payment method","SUCCESS","Customer created without payment method","");
  }
}


function create_customer_with_payment_method(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create customer with payment method","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_customer_with_payment_method",
    "type":"RapydAPI",
    "extra":{   },
    "record":{
    "name": "Jane Doe",
    "business_vat_id": "123456666",
    "email": "janedoe6666@rapyd.net",
    "ewallet": "ewallet_a866886dc65d835ef42fe1314509b8ec",
    "invoice_prefix": "JD-",
    "metadata": {
        "merchant_defined": true
    },
    "payment_method": {
        "type": "us_visa_card",
        "fields": {
            "number": "4111111111111111",
            "expiration_month": "10",
            "expiration_year": "23",
            "cvv": "123"
        }
    },
    "phone_number": "+14155556666"
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
    ui.alert('Create customer with payment method',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create customer with payment method",error_code,"",message);
  }
  else{
    ui.alert('Create customer with payment method',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create customer with payment method","SUCCESS","Customer created with payment method","");
  }
}

function update_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_customer",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_5b66f7253de61ae20abc6350f3a5e52d"},
    "record":{
          "default_payment_method": "card_bb4911c73eb2ce9fb9ae4357178225c3"
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
    ui.alert('Update customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update customer",error_code,"",message);
  }
  else{
    ui.alert('Update customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update customer","SUCCESS","Customer updated","");
  }
}

function retrieve_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_customer",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_5b66f7253de61ae20abc6350f3a5e52d"
       },
    "record":{    } 
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
    ui.alert('Retrieve customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve customer",error_code,"",message);
  }
  else{
    ui.alert('Retrieve customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve customer","SUCCESS","Customer retrieved","");
  }
}

function list_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_customer",
    "type":"RapydAPI",
    "extra":{  
      "ending_before" : "",
      "limit":"",
      "starting_after":""
       },
    "record":{    } 
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
    ui.alert('List customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List customer",error_code,"",message);
  }
  else{
    ui.alert('List customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List customer","SUCCESS","Customer listed","");
  }
}

function delete_discount_from_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete discount from customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "delete_discount_from_customer",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_5b66f7253de61ae20abc6350f3a5e52d"
       },
    "record":{    } 
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
    ui.alert('Delete discount from customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete discount from customer",error_code,"",message);
  }
  else{
    ui.alert('Delete discount from customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete discount from customer","SUCCESS","Discount deleted from customer","");
  }
}

//-----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------------
function create_address(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create address","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_address",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "name": "John Doe",
    "line_1": "123 State Street",
    "line_2": "Apt. 34",
    "line_3": "",
    "city": "Anytown",
    "district": "",
    "canton": "",
    "state": "NY",
    "country": "US",
    "zip": "12345",
    "phone_number": "12125559999",
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
    ui.alert('Create address',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create address",error_code,"",message);
  }
  else{
    ui.alert('Create address',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create address","SUCCESS","Address created","")
  }
}

function update_address(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update address","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_address",
    "type":"RapydAPI",
    "extra":{  
      "address_id":"address_b6211c6282139b382b923688fa78e1cb"
     },
    "record":
      {
     "metadata": {
        "merchant_defined": "updated"
    },
    "line_2": "Apt. 56"
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
    ui.alert('Update address',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update address",error_code,"",message);
  }
  else{
    ui.alert('Update address',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update address","SUCCESS","Address updated","")
  }
}

function retrieve_address(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve address","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_address",
    "type":"RapydAPI",
    "extra":{  
      "address_id":"address_b6211c6282139b382b923688fa78e1cb"
     },
    "record":{}  
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
    ui.alert('Retrieve address',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve address",error_code,"",message);
  }
  else{
    ui.alert('Retrieve address',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve address","SUCCESS","Address retrieved","")
  }
}

//-------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------------------
function add_payment_method_to_customer_card_by_id(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Add Payment Method to Customer - Card by ID","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "add_payment_method_to_customer_card_by_id",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8"
     },
    "record":
      {
    "type": "ec_card_card",
    "fields": null,
    "metadata": {
        "merchant_defined": true
    }
    }}
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
    ui.alert('Add Payment Method to Customer - Card by ID',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Add Payment Method to Customer - Card by ID",error_code,"",message);
  }
  else{
    ui.alert('Add Payment Method to Customer - Card by ID',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Add Payment Method to Customer - Card by ID","SUCCESS","Add Payment Method to Customer - Card by ID Done","")
  }
}

function update_payment_method_metadata(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update Payment Method - metadata","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_payment_method_metadata",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8",
      "payment_method":"card_7bd0604ca358c404bd69669ba2a8f443"
     },
    "record":
      {
    "metadata": {
    	"merchant_defined": "Prime customer"
    }}}
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
    ui.alert('Update Payment Method - metadata',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Payment Method - metadata",error_code,"",message);
  }
  else{
    ui.alert('Update Payment Method - metadata',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Payment Method - metadata","SUCCESS","Update Payment Method - metadata Done","")
  }
}

function update_payment_method_card_fields(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update Payment Method - Update Card Fields","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_payment_method_card_fields",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8",
      "payment_method":"card_7bd0604ca358c404bd69669ba2a8f443"
     },
    "record":
      {
        "address": {},
  "fields": {
    "expiration_month": "11",
    "expiration_year": "22",
    "name": "John H Doe"
  },
  "metadata": {
    "merchant_defined": "Prime customer"
  }
      }}
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
    ui.alert('Update Payment Method - Update Card Fields',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Payment Method - Update Card Fields",error_code,"",message);
  }
  else{
    ui.alert('Update Payment Method - Update Card Fields',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update Payment Method - Update Card Fields","SUCCESS","Update Payment Method - Update Card Fields Done","")
  }
}


function retrieve_payment_method(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve Payment Method","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_payment_method",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8",
      "payment_method":"card_7bd0604ca358c404bd69669ba2a8f443"
     },
    "record":{ }
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
    ui.alert('Retrieve Payment Method',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve Payment Method",error_code,"",message);
  }
  else{
    ui.alert('Retrieve Payment Method',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve Payment Method","SUCCESS","Retrieve Payment Method Done","")
  }
}

function list_payment_method_of_customer(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Payment Methods of Customer","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_payment_method_of_customer",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8"
      
     },
    "record":{ }
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
    ui.alert('List Payment Methods of Customer',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Payment Methods of Customer",error_code,"",message);
  }
  else{
    ui.alert('List Payment Methods of Customer',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Payment Methods of Customer","SUCCESS","List Payment Methods of Customer","")
  }
}

function delete_payment_method(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete Payment Method","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "delete_payment_method",
    "type":"RapydAPI",
    "extra":{  
      "customer_id":"cus_951d73efe0abf516e33b23efa65a3ab8",
      "payment_method":"card_7bd0604ca358c404bd69669ba2a8f443"
     },
    "record":{ }
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
    ui.alert('Delete Payment Method',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete Payment Method",error_code,"",message);
  }
  else{
    ui.alert('Delete Payment Method',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete Payment Method","SUCCESS","Delete Payment Method Done","")
  }
}

//---------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---------------------------
function list_payment_methods_by_country(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Payment Methods by Country","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_payment_methods_by_country",
    "type":"RapydAPI",
    "extra":{  
      "country":"CR",
      "currency":""
     },
    "record":{ }
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
    ui.alert('List Payment Methods by Country',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Payment Methods by Country",error_code,"",message);
  }
  else{
    ui.alert('List Payment Methods by Country',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List Payment Methods by Country","SUCCESS","List Payment Methods by Country Done","")
  }
}

function get_payment_method_required_fields(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Get Payment Method Required Fields","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "get_payment_method_required_fields",
    "type":"RapydAPI",
    "extra":{  },
    "record":{ }
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
    ui.alert('Get Payment Method Required Fields',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Get Payment Method Required Fields",error_code,"",message);
  }
  else{
    ui.alert('Get Payment Method Required Fields',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Get Payment Method Required Fields","SUCCESS","Get Payment Method Required Fields Done","")
  }
}

//--------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------
function create_token(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create token","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_token",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "type": "pii",
    "data": {
        "metadata": {
      		"merchant_defined": true
    		},
        "pii": {
            "name": "John Doe",
            "size": "12"
        },
        "personal_id_number": "987654"
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
    ui.alert('Create token',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create token",error_code,"",message);
  }
  else{
    ui.alert('Create token',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create token","SUCCESS","Token created","")
  }
}

function create_bank_account_token(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create bank account token","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_bank_account_token",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "type": "bank_account",
    "data": {
        "account_holder_name": "John Doe",
        "account_holder_type": "individual",
        "account_number": "321321321",
        "bank_name": "TEST BANK FOUR",
        "country": "US",
        "currency": "USD",
        "metadata": {
        	"merchant_defined": true
        },
        "routing_number": "80808080808080"
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
    ui.alert('Create bank account token',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create bank account token",error_code,"",message);
  }
  else{
    ui.alert('Create bank account token',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create bank account token","SUCCESS","Bank Account Token created","")
  }
}

function create_card_token(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create card token","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_card_token",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "type": "card",
    "data": {
        "type": "au_visa_card",
        "fields": {
            "number": "4111111111111111",
            "expiration_month": "12",
            "expiration_year": "23",
            "date_of_birth": "20/08/2000",
            "cvv": "345"
        },
        "address": {
            "id": "address_9bafd4e83cd5b2d5657822eb1789230c",
            "name": "John Doe",
            "line_1": "123 Main Street",
            "line_2": "4th Floor, Room 405",
            "line_3": "",
            "city": "Anytown",
            "state": "CA",
            "country": "US",
            "zip": "94115",
            "phone_number": "+14155550986",
            "canton": "",
            "district": "",
            "created_at": 1568272746
        },
        "metadata": {
            "merchant_defined": true
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
    ui.alert('Create card token',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token",error_code,"",message);
  }
  else{
    ui.alert('Create card token',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token","SUCCESS","Card Token created","")
  }
}

function create_card_token_with_payment_method_type(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create Card Token with payment method type","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_card_token_with_payment_method_type",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "country": "US",
    "currency": "USD",
    "customer": "cus_951d73efe0abf516e33b23efa65a3ab8",
    "payment_method_type": "us_mastercard_card"
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
    ui.alert('Create card token with payment method type',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token with payment method type",error_code,"",message);
  }
  else{
    ui.alert('Create card token with payment method type',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token with payment method type","SUCCESS","Card Token created with payment method type Done","")
  }
}

function create_card_token_without_payment_method_type(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create Card Token without payment method type","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_card_token_without_payment_method_type",
    "type":"RapydAPI",
    "extra":{   },
    "record":
      {
    "country": "US",
    "currency": "USD",
    "customer": "cus_951d73efe0abf516e33b23efa65a3ab8",
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
    ui.alert('Create card token without payment method type',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token without payment method type",error_code,"",message);
  }
  else{
    ui.alert('Create card token without payment method type',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create card token without payment method type","SUCCESS","Card Token created without payment method type Done","")
  }
}

function retrieve_token(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve token","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_token",
    "type":"RapydAPI",
    "extra":{  
      "token_id":"tok_02c37d5e76dfb5a1b83018350736bbd1"
     },
    "record":{}  
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
    ui.alert('Retrieve token',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve token",error_code,"",message);
  }
  else{
    ui.alert('Retrieve token',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve token","SUCCESS","Token retrieved","")
  }
}
//------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---------------------------------------
function create_product(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create product","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_product",
    "type":"RapydAPI",
    "extra":{   },
    "record":{
    "id": "",
    "name": "Monthly parking",
    "type": "services",
    "active": true,
    "attributes": [
        "location",
        "size"
    ],
    "description": "Monthly parking - covered area, compact car",
    "images": [
        "64bit-encoded-image-1",
        "64bit-encoded-image-2"
    ],
    "metadata": {
        "merchant_defined": true
    },
    "shippable": false,
    "statement_descriptor": "",
    "unit_label": ""
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
    ui.alert('Create product',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create product",error_code,"",message);
  }
  else{
    ui.alert('Create product',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create product","SUCCESS","Product created","");
  }
}

function update_product(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update product","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "update_product",
    "type":"RapydAPI",
    "extra":{  
      "product_id":"product_a8ac217211583d32876b1c82fca3b0d0"
       },
    "record":{
          "name": "Gamer's Red Chair",
    "attributes": [
        "color",
        "armrest",
        "cover"
    ],
    "metadata": {
        "merchant_defined": "red chair"
    },
        "package_dimensions": {
            "height": 10,
            "length": 20,
            "weight": 100,
            "width": 40
        },
    "statement_descriptor": "",
    "unit_label": ""
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
    ui.alert('Update product',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update product",error_code,"",message);
  }
  else{
    ui.alert('Update product',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Update product","SUCCESS","Product updated","");
  }
}

function retrieve_product(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve product","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "retrieve_product",
    "type":"RapydAPI",
    "extra":{  
      "product_id":"product_a8ac217211583d32876b1c82fca3b0d0"
       },
    "record":{    } 
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
    ui.alert('Retrieve product',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve product",error_code,"",message);
  }
  else{
    ui.alert('Retrieve product',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Retrieve product","SUCCESS","Product retrieved","");
  }
}

function list_product(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List product","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "list_product",
    "type":"RapydAPI",
    "extra":{  
      
       },
    "record":{    } 
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
    ui.alert('List product',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List product",error_code,"",message);
  }
  else{
    ui.alert('List product',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","List product","SUCCESS","Product listed","");
  }
}

function delete_product(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete product","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "delete_product",
    "type":"RapydAPI",
    "extra":{  
      "product_id":"product_a8ac217211583d32876b1c82fca3b0d0"
       },
    "record":{    } 
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
    ui.alert('Delete product',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete product",error_code,"",message);
  }
  else{
    ui.alert('Delete product',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Delete product","SUCCESS","Product deleted","");
  }
}
