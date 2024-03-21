function doGet(e) {
  Logger.log(e)
  var htmlOuptut = HtmlService.createTemplateFromFile('Title');
  htmlOuptut.title = 'Home Page';
  return htmlOuptut.evaluate();

}


var id = "1TPZQT-IbFCgTNSzJ4ZIJiw_slmi8FpU4-HDUnyfvv8k";
var spreadsheet = SpreadsheetApp.openById(id);
var subjects = []
subjects[0]  = spreadsheet.getSheetByName("PE");
subjects[1] = spreadsheet.getSheetByName("Physics")


function retrieveLength(sub){
  var length = subjects[sub].getDataRange().getNumRows();
  return length
}

function  getUrl () {
 var url = ScriptApp.getService().getUrl();
 return url;
}



function doPost(e){
   Logger.log(JSON.stringify(e))
    if(e.parameter.Button1 == 'PDHPE'){ 
      var htmlOutput =  HtmlService.createTemplateFromFile('PDHPE');
      htmlOutput.title = 'PDHPE:'; 
      return htmlOutput.evaluate();
    }if(e.parameter.Button2 == 'Back To Home Screen'){
      var htmlOuptut = HtmlService.createTemplateFromFile('Title');
      htmlOuptut.title = 'Home';
      return htmlOuptut.evaluate();
    }if(e.parameter.Button3== 'Physics'){
      var htmlOuptut = HtmlService.createTemplateFromFile('Physics');
      htmlOuptut.title = 'Physics:' ;
      return htmlOuptut.evaluate();
    }else{
      var htmlOutput =  HtmlService.createTemplateFromFile('error');
      htmlOutput.title = 'error:'; 
      return htmlOutput.evaluate();
    }
    }




function retrieveQuestions(questionNum, sub){
  var question = subjects[sub].getRange(questionNum , 1).getValue();
  return question;
}

function retrieveHide(quesitonNum, sub){
  var hide = subjects[sub].getRange(quesitonNum, 9).getValue();
  return hide
}

function retrieveYear(questionNum, sub){
  var QYear = subjects[sub].getRange(questionNum, 7).getValue()
  return QYear
}

function retrieveAnswerOne(questionNum, sub){
  var AOne = subjects[sub].getRange(questionNum, 2).getValue()
  return AOne
}

function retrieveAnswerTwo(questionNum, sub){
  var ATwo = subjects[sub].getRange(questionNum, 3).getValue()
  return ATwo
}

function retrieveAnswerThree(questionNum, sub){
  var AThree = subjects[sub].getRange(questionNum, 4).getValue()
  return AThree
}

function retrieveAnswerFour(questionNum, sub){
  var AFour = subjects[sub].getRange(questionNum, 5).getValue()
  return AFour
}

function retrieveImage(questionNum, sub){
  var AImage = subjects[sub].getRange(questionNum, 8).getValue()
  return AImage
}

function retrieveAnswer(userAns,questionNum,sub){
  var correct = "wrong";
  var answerRay = ["", ""]
  var answer = subjects[sub].getRange(questionNum, 6).getValue();
  if (userAns == answer){
    var correct = "correct";
  }
  answerRay[0]=correct
  answerRay[1]=answer
  answerRay[2]=userAns
  return answerRay
}





