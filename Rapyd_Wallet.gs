function create_ewallet() {
   
  const  ui = SpreadsheetApp.getUi();

  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Wallet');
  
  insertTelemetry("Menu Click","Ewallet --> Create Ewallet","FUNCTION_CALL","Function call successfull","");

  var raw_json = JSON.stringify(
    {"queryType" : "create_wallet",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
      "ewallet_reference_id": "",
      "first_name": "", 
      "last_name": "", 
      "email": "",  
      "phone_number": "", 
      "type": "person", 
      "contact": { 
        "phone_number": "", 
        "email": "", 
        "first_name": "", 
        "last_name": "", 
        "mothers_name": "", 
        "contact_type": "", 
        "address": {  }, 
      "identification_type": "", 
      "identification_number": "", 
      "date_of_birth": "", 
      "country": "", 
      "nationality": ""
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
    if(selected[0][0] === ""){
      ui.alert("Please Enter a valid and unique Ewallet refernce id to create new Ewallet")
      insertTelemetry("Menu Click","Ewallet --> Create Ewallet","ERROR","","Ewallet reference id in not valid or unique.");
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["ewallet_reference_id"] = selected[0][0];
      raw1["record"]["first_name"] = selected[0][1];
      raw1["record"]["last_name"] = selected[0][2];
      raw1["record"]["type"] = selected[0][3];
      raw1["record"]["phone_number"]= String(selected[0][4]);      
      raw1["record"]["email"]= selected[0][5];
      raw1["record"]["contact"]["phone_number"]= String(selected[0][4]);
      raw1["record"]["contact"]["email"]= selected[0][5];
      raw1["record"]["contact"]["first_name"]= selected[0][1];
      raw1["record"]["contact"]["last_name"]= selected[0][2];
      raw1["record"]["contact"]["mothers_name"]= selected[0][6];
      raw1["record"]["contact"]["contact_type"]= selected[0][9];
      raw1["record"]["contact"]["address"]= JSON.parse(String(selected[0][8].replace(/(\r\n|\n|\r)/gm,"")));
      raw1["record"]["contact"]["identification_type"]= selected[0][10];
      raw1["record"]["contact"]["identification_number"]= String(selected[0][11]);
      var dob = Utilities.formatDate(selected[0][7], "GMT+1", "MM/dd/yyyy")
      raw1["record"]["contact"]["date_of_birth"]= dob;
      raw1["record"]["contact"]["country"]= selected[0][12];
      raw1["record"]["contact"]["nationality"]= selected[0][13];

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
        ui.alert('Create ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Create Ewallet",error_code,"",message);
      }
      if (status === "SUCCESS"){
        sheet.getRange(sheet.getActiveRange().getRowIndex(),15).setValue(results['ewallet_id']);
        sheet.getRange(sheet.getActiveRange().getRowIndex(),16).setValue(results['contact_id']);
        sheet.getRange(sheet.getActiveRange().getRowIndex(),17).setValue(results['address_id']);

        ui.alert('Create ewallet','Ewallet has been successfully created',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Create Ewallet",status,"Ewallet has been successfully created","");
      }
      
    }
  }
}
//----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------------

function update_ewallet(){
  const  ui = SpreadsheetApp.getUi();

  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet_name =  spreadsheet.getActiveSheet().getName();
  insertTelemetry("Menu Click","Ewallet --> Update Ewallet","FUNCTION_CALL","Function call successfull","");
  Logger.log(sheet_name)
  if (sheet_name == 'Energy Farmer'){
    const htmlForSidebar = HtmlService.createTemplateFromFile("edit_selected_sidebar");
    const htmlOutput =  htmlForSidebar.evaluate();
    htmlOutput.setTitle("Update wallet details - ")
    ui.showSidebar(htmlOutput);
  }
  else{
    ui.alert('Update wallet details','This functionality is available for NON Read-Only sheets only.',ui.ButtonSet.OK);
  }
  var raw_json = JSON.stringify(
    {"queryType" : "update",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
  "ewallet": "ewallet_5a58771e82b64d79f2f6c3418a8bd066",
  "ewallet_reference_id": "updated-ref_id8988",
  "metadata": {
  "merchant_defined": "updated"
  }
    }
    })
 //raw_json = JSON.stringify(raw1);
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
        //ui.alert('Update ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Update Ewallet",error_code,"",message);
      }
      if (status === "SUCCESS"){

        //ui.alert('Update ewallet','Ewallet has been successfully created',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Update Ewallet",status,"Ewallet has been successfully updated","");
      }
}

//----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------------

function disable_ewallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Ewallet --> Disable Ewallet","FUNCTION_CALL","Function call successfull","");
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Wallet');

  var raw_json = JSON.stringify(  
  { "queryType" : "disable",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
      "ewallet": ""
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
    if(selected[0][14] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
      insertTelemetry("Menu Click","Ewallet --> Disable Ewallet","ERROR","","Ewallet id is not present");
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["ewallet"] = selected[0][14];
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
        ui.alert('Create ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Disable Ewallet",error_code,"",message);
      }
      if (status === "SUCCESS"){
        sheet.getRange(sheet.getActiveRange().getRowIndex(),18).setValue('Disabled');
        sheet.getRange(sheet.getActiveRange().getRowIndex(),19).setValue('Not enable');
        sheet.getRange(sheet.getActiveRange().getRowIndex(),18).setBackground("#34a853")
        sheet.getRange(sheet.getActiveRange().getRowIndex(),19).setBackground("#ea4335")
        ui.alert('Disable ewallet','Ewallet has been successfully disabled',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Disable Ewallet",status,"Ewallet has been successfully disabled","");
      }
    }
  }

}

//-----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------
function enable_ewallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Ewallet --> Enable Ewallet","FUNCTION_CALL","Function call successfull","");
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Wallet');

  var raw_json = JSON.stringify(  
  { "queryType" : "disable",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
      "ewallet": ""
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
    if(selected[0][14] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
      insertTelemetry("Menu Click","Ewallet --> Enable Ewallet","ERROR","","Ewallet id is not present");
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["ewallet"] = selected[0][14];
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
        ui.alert('Create ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Enable Ewallet",error_code,"",message);
      }
      if (status === "SUCCESS"){
        sheet.getRange(sheet.getActiveRange().getRowIndex(),18).setValue('Not Disable');
        sheet.getRange(sheet.getActiveRange().getRowIndex(),19).setValue('Enabled');
        sheet.getRange(sheet.getActiveRange().getRowIndex(),19).setBackground("#34a853")
        sheet.getRange(sheet.getActiveRange().getRowIndex(),18).setBackground("#ea4335")
        ui.alert('Disable ewallet','Ewallet has been successfully enabled',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Enable Ewallet",status,"Ewallet has been successfully enabled","");
      }
    }
  }

}

//---------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---------------------------------

function retrieve_ewallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Ewallet --> Retrieve Ewallet","FUNCTION_CALL","Function call successfull","");
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Wallet');

  var raw_json = JSON.stringify(  
  { "queryType" : "disable",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
      "ewallet": ""
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
    if(selected[0][14] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
      insertTelemetry("Menu Click","Ewallet --> Retrieve Ewallet","ERROR","","Ewallet id is not present");
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["ewallet"] = selected[0][14];
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
        ui.alert('Retrieve ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Retrieve Ewallet",error_code,"",message);
      }
      else{
        ui.alert('Retrieve Ewallet',''+response+'',ui.ButtonSet.OK)
        insertTelemetry("Menu Click","Ewallet --> Retrieve Ewallet",status,"Ewallet has been successfully retrieve","");
      }
    }
  }

}
//---------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---------------------------------
function delete_ewallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Ewallet --> Delete Ewallet","FUNCTION_CALL","Function call successfull","");
  var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadsheet.getSheetByName('Wallet');

  var raw_json = JSON.stringify(  
  { "queryType" : "disable",
    "type":"RapydAPI",
    "extra":{    },
    "record":{ 
      "ewallet": ""
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
    if(selected[0][14] == ""){
      ui.alert("E-wallet Not created. Please create a wallet using \"Create ewallet\" option from menu.")
      insertTelemetry("Menu Click","Ewallet --> Delete Ewallet","ERROR","","Ewallet id is not present");
    }
    else{
      var raw1 = JSON.parse(raw_json);
      raw1["record"]["ewallet"] = selected[0][14];
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
        ui.alert('Create ewallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Delete Ewallet",error_code,"",message);
      }
      if (status === "SUCCESS"){
        sheet.deleteRow(sheet.getActiveRange().getRowIndex())
        ui.alert('Delete ewallet','Ewallet has been successfully deleted',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Ewallet --> Delete Ewallet",status,"Ewallet has been successfully delete","");
      }
    }
  }

}

//-----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------

function add_contact_to_wallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Add contact to wallet","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "add_contact_to_wallet",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1"
     },
    "record": {
      "first_name": "Jane",
      "last_name": "Doe",
      "middle_name": "",
      "second_last_name": "",
      "mothers_name": "Jane Smith",
      "gender": "female",
      "marital_status": "single",
      "house_type": "lease",
      "contact_type": "personal",
      "phone_number": "+14155551233",
      "email": "jane200@rapyd.net",
      "identification_type": "PA",
      "identification_number": "1233242424",
      "date_of_birth": "11/22/2000",
      "country": "US",
      "nationality": "FR",
      "address": {
      "name": "Jane Doe",
      "line_1": "123 Lake Forest Drive",
      "line_2": "",
      "line_3": "",
      "city": "Anytown",
      "state": "NY",
      "zip": "12345",
      "phone_number": "+14155551234",
      "metadata": {
      "merchant_defined": true
      },
      "canton": "",
      "district": ""
      },
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
        ui.alert('Add contact to wallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Add contact to wallet",error_code,"",message);
      }
      if (status === "SUCCESS"){
        ui.alert('Add contact to wallet','Contact has been succefully added',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Add contact to wallet",status,"Contact has been succefully added for selected Ewallet","");
      }
}

//------------------xxxxxxxxxxxxxxxxxxxxxx----------------------
function update_wallet_contact(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Update Wallet Contact","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "update_wallet_contact",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {
      
    "phone_number": "+14155551288",
    "metadata": {
        "merchant_defined": "updated"
    }
 }
     
  });
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
        ui.alert('Update Wallet contact',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Update Wallet Contact",error_code,"",message);
      }
      else{
        ui.alert('Update Wallet Contact',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Update Wallet Contact","SUCCESS","Contact has been succefully updated for selected Ewallet","");
      }
}

//------------------xxxxxxxxxxxxxxxxxxxxxx----------------------
function retrieve_wallet_contact(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrieve Wallet Contact","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "retrieve_wallet_contact",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {  }
  });
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
        ui.alert('Retrieve Wallet Contact',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Retrieve Wallet Contact",error_code,"",message);
      }
      else{
        ui.alert('Retrieve Wallet Contact',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Retrieve Wallet Contact","SUCCESS","Contact has been retrieve successfully for selected Ewallet","");
      }
}

//-------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------------------
function list_contact_for_a_rapyd_wallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List Contacts for a Rapyd Wallet","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "list_contact_for_a_rapyd_wallet",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1"
     },
    "record": {  }
  });
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
        ui.alert('List Contacts for a Rapyd Wallet',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List Contacts for a Rapyd Wallet",error_code,"",message);
      }
      else{
        ui.alert('List Contacts for a Rapyd Wallet',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List Contacts for a Rapyd Wallet","SUCCESS","Contact has been listed successfully","");
      }
}

//-------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------------------
function delete_wallet_contact(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete Wallet Contact","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "delete_wallet_contact",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {  }
  });
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
        ui.alert('Delete Wallet Contact',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Delete Wallet Contact",error_code,"",message);
      }
      else{
        ui.alert('Delete Wallet Contact',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Delete Wallet Contact","SUCCESS","Contact has been deleted successfully for selected Ewallet","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function transfer_funds_between_wallet(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Transfer Funds Between Wallets","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "transfer_funds_between_wallet",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {  }
  });
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
        ui.alert('Transfer Funds Between Wallets',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Transfer Funds Between Wallets",error_code,"",message);
      }
      else{
        ui.alert('Transfer Funds Between Wallets',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Transfer Funds Between Wallets","SUCCESS","Transfer completed between wallet","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function put_fund_on_hold(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Put funds on hold","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "put_fund_on_hold",
    "type":"RapydAPI",
    "extra":{        },
    "record": {
  "ewallet": "ewallet_d5184b6982dac9e1ca76d27a32c87db1",
  "amount": 8.90,
  "currency": "USD"
}
  });
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
        ui.alert('Put funds on hold',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Put funds on hold",error_code,"",message);
      }
      else{
        ui.alert('Put funds on hold',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Put funds on hold","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function release_on_hold_fund(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Release ON-hold fund","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "release_on_hold_fund",
    "type":"RapydAPI",
    "extra":{   },
    "record": { 
  "ewallet": "ewallet_d5184b6982dac9e1ca76d27a32c87db1",
  "amount": 8.80,
  "currency": "USD"

     }
  });
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
        ui.alert('Release ON-hold fund',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Release ON-hold fund",error_code,"",message);
      }
      else{
        ui.alert('Release ON-hold fund',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Release ON-hold fund","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function set_wallet_account_limit(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Set wallet account limit","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "set_wallet_account_limit",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1"
     },
    "record": { 
    "currency": "USD",
    "amount": 120000,
    "type": "max_balance_limit"
     }
  });
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
        ui.alert('Set wallet account limit',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Set wallet account limit",error_code,"",message);
      }
      else{
        ui.alert('Set wallet account limit',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Set wallet account limit","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function delete_wallet_account_limit(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Delete wallet account limit","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "delete_wallet_account_limit",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1"
     },
    "record": { 
    "type": "max_balance_limit",
    "currency": "USD"
  }
  });
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
        ui.alert('Delete wallet account limit',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Delete wallet account limit",error_code,"",message);
      }
      else{
        ui.alert('Delete wallet account limit',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Delete wallet account limit","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function list_wallet_transaction(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List wallet Transaction","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "list_wallet_transaction",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1"
     },
    "record": {  }
  });
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
        ui.alert('List wallet Transaction',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List wallet Transaction",error_code,"",message);
      }
      else{
        ui.alert('List wallet Transaction',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List wallet Transaction","SUCCESS","Fund on Hold","");
      }
}


//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function list_wallet_transaction_by_type(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","List wallet Transaction by Type","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "list_wallet_transaction_by_type",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "transaction_type" : "add_funds"
     },
    "record": {  }
  });
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
        ui.alert('List wallet Transaction by Type',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List wallet Transaction by Type",error_code,"",message);
      }
      else{
        ui.alert('List wallet Transaction by Type',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","List wallet Transaction by Type","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function retrive_wallet_balance(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Retrive wallet balance","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "retrive_wallet_balance",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {  }
  });
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
        ui.alert('Retrive wallet balance',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Retrive wallet balance",error_code,"",message);
      }
      else{
        ui.alert('Retrive wallet balance',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Retrive wallet balance","SUCCESS","Fund on Hold","");
      }
}

//------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--------------------------
function get_details_of_wallet_transaction(){
  const  ui = SpreadsheetApp.getUi();
  insertTelemetry("Menu Click","Get details of wallet transaction","FUNCTION_CALL","Function call successfull","");
  //var spreadsheet =  SpreadsheetApp.getActiveSpreadsheet();
  //var sheet =  spreadsheet.getSheetByName('Wallet');
  var raw_json = JSON.stringify(  
  { "queryType" : "get_details_of_wallet_transaction",
    "type":"RapydAPI",
    "extra":{   
      "ewallet_id":"ewallet_d5184b6982dac9e1ca76d27a32c87db1",
      "contact_id":"cont_a0bd952434f81c06759345be9e4b1629"
     },
    "record": {  }
  });
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
        ui.alert('Get details of wallet transaction',error_code,ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Get details of wallet transaction",error_code,"",message);
      }
      else{
        ui.alert('Get details of wallet transaction',''+response+'',ui.ButtonSet.OK);
        insertTelemetry("Menu Click","Get details of wallet transaction","SUCCESS","Fund on Hold","");
      }
}