function doGet(e) {
  Logger.log(e)
  var htmlOuptut = HtmlService.createTemplateFromFile('Title');
  htmlOuptut.title = 'Home Page';
  return htmlOuptut.evaluate();

}

var id = "1TPZQT-IbFCgTNSzJ4ZIJiw_slmi8FpU4-HDUnyfvv8k";
var spreadsheet = SpreadsheetApp.openById(id);
var Pdhpe  = spreadsheet.getSheetByName("PE 2021");

function  getUrl () {
 var url = ScriptApp.getService().getUrl();
 return url;
}

function doPost(e){
   Logger.log(JSON.stringify(e))
    if(e.parameter.Button1 == 'StartButton'){ 
    var htmlOutput =  HtmlService.createTemplateFromFile('Test');
    htmlOutput.title = 'Dashbord:'; 
    return htmlOutput.evaluate();
    }if(e.parameter.Button2 == 'BackButton'){
    var htmlOuptut = HtmlService.createTemplateFromFile('Title');
    htmlOuptut.title = 'Home';
    return htmlOuptut.evaluate();
    }else{
    var htmlOutput =  HtmlService.createTemplateFromFile('error');
    htmlOutput.title = 'error:'; 
    return htmlOutput.evaluate();
    }
    }



function next(clicked){
  Logger.log(clicked);


}

function retrieveQuestions(){

  var question = Pdhpe.getRange(1 , 2).getValue();
  return question;

}

