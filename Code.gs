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
    if(e.parameter.Button1 == 'Start'){ 
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




function retrieveQuestions(questionNum){

  var question = Pdhpe.getRange(questionNum , 1).getValue();
  return question;
}

function retrieveYear(questionNum){
  var QYear = Pdhpe.getRange(questionNum, 7).getValue()
  return QYear
}

function retrieveAnswerOne(questionNum){
  var AOne = Pdhpe.getRange(questionNum, 2).getValue()
  return AOne
}

function retrieveAnswerTwo(questionNum){
  var ATwo = Pdhpe.getRange(questionNum, 3).getValue()
  return ATwo
}

function retrieveAnswerThree(questionNum){
  var AThree = Pdhpe.getRange(questionNum, 4).getValue()
  return AThree
}

function retrieveAnswerFour(questionNum){
  var AFour = Pdhpe.getRange(questionNum, 5).getValue()
  return AFour
}

