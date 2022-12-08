function create_payout(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Create Payout","FUNCTION_CALL","Function call successfull","");
  var raw_json = JSON.stringify(
    {"queryType" : "create_payout",
    "type":"RapydAPI",
    "extra":{     },
    "record":{
  "ewallet": "ewallet_bb5a1134929a033f02c47a3c7dec45d8",
  "payout_amount": 250,
  "payout_method_type": "us_visa_card",
  "sender_currency": "USD",
  "sender_country": "US",
  "beneficiary": {
  "email": "JaneDoe@Rapyd.net ",
  "card_number": "4111111111111111",
  "card_expiration_month": "11",
  "card_expiration_year": "23",
  "card_cvv": "123",
  "first_name": "Jane",
  "last_name": "Doe"
  },
  "beneficiary_country": "US",
  "payout_currency": "USD",
  "sender_entity_type": "company",
  "beneficiary_entity_type": "individual",
  "sender": {
  "company_name": "RideShare",
  "postcode": "WSQ12",
  "city": "Any Town",
  "state": "New State",
  "address": "123 1st ave."
  },
  "description": "Payout to card",
  "statement_descriptor": "monthly expenses-part time"
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
    ui.alert('Create Payout',error_code,ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create Payout",error_code,"",message);
  }
  else{
    ui.alert('Create Payout',''+response+'',ui.ButtonSet.OK);
    insertTelemetry("Menu Click","Create Payout","SUCCESS","Payout created","");
  }
}
