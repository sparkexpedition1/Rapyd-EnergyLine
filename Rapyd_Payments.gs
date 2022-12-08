function list_countries(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Countries","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "get_countries"
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    insertTelemetry("Menu Click","List Countries","SUCCESS","List of countries shown in UI","");
    ui.alert(''+response+'');
}

function get_daily_rate(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Get daily rate","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "get_daily_rate",
    "record":{
      "buy_currency":"USD",
      "sell_currency":"EUR"
    }
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    ui.alert(''+response+'');
    insertTelemetry("Menu Click","Get daily rate","SUCCESS","Get daily rate shown in UI","");
}

function list_currencies(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Currencies","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "list_currencies"
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    ui.alert(''+response+'');
    insertTelemetry("Menu Click","List Countries","SUCCESS","List of currency shown in UI","");
}

function retrive_rapyd_pos_location(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve Rapyd POS location","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "retrive_raypd_pos_location",
    "record":{
      "pos_id" : "52c55a29-0027-11e8-a6a7-0e0cbbc44a18"
    }
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    ui.alert(''+response+'');
    insertTelemetry("Menu Click","Retrieve Rapyd POS location","SUCCESS","Retrieve Rapyd POS location shown in UI","");
}

function list_pos_location_by_coordinate(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Rapyd POS Locations by Coordinates","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "list_rapyd_pos_locations_by_coordinates",
    "record":{
      "longitude":"0",
      "latitude":"51",
      "radius":"1"
    }
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    ui.alert(''+response+'');
    insertTelemetry("Menu Click","List Rapyd POS Locations by Coordinates","SUCCESS","List of POS location by corordinates shown in UI","");
}

function list_pos_location(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List POS location","FUNCTION_CALL","Function call successfull","");
  var rapyd_api_json = JSON.stringify(
  { "type":"RapydAPI", 
    "queryType" : "list_rapyd_pos_locations",
    
  }
  );
  var requestOptions = {
      'method': 'POST',
      'headers': { 
          "Api-Token": "API TOKEN",
          "Content-Type": "application/json",
          "Cookie": "COOKIE"
        },
      'payload': rapyd_api_json
    };
    //Logger.log()
    var request = "https://rapyd-energybazaar-api-6httuqd2wq-uc.a.run.app/"

    var response = UrlFetchApp.fetch(request, requestOptions)
    
    if(response != false){
      var json = response.getContentText();
    }
    ui.alert(''+response+'');
    insertTelemetry("Menu Click","List POS location","SUCCESS","List of POS location shown in UI","");
}

function list_pos_location_cluster(){
  //"query_type": "list_rapyd_pos_locations_by_coordinates_cluster_based"
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List POS location- Cluster","FUNCTION_CALL","Function call successfull","");
  ui.alert('Feature in development :)')
  insertTelemetry("Menu Click","List POS location- Cluster","IN_DEVELOPMENT","Feature in development","");
}