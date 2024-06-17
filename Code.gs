function doGet(e) {
  // This function loads the main page on web load
  Logger.log(e)
  var htmlOuptut = HtmlService.createTemplateFromFile('Title');
  htmlOuptut.title = 'Home Page';
  return htmlOuptut.evaluate();

}

// This is the information about the spreadsheet that is used to import the information into the program
var id = "1TPZQT-IbFCgTNSzJ4ZIJiw_slmi8FpU4-HDUnyfvv8k";
var spreadsheet = SpreadsheetApp.openById(id);
var subjects = []
// Each subject has its own page in the spreadsheet that is stored in the array title subjects
subjects[0]  = spreadsheet.getSheetByName("PE");
subjects[1] = spreadsheet.getSheetByName("Physics")


function retrieveLength(sub){
  // The function retrieves how many rows there are in the spreadsheet
  // .getNumRows looks for the number of filled rows in a range which since empty is the entire spreadsheet
  var length = subjects[sub].getDataRange().getNumRows();
  return length
}

function  getUrl () {
 var url = ScriptApp.getService().getUrl();
 return url;
}



function doPost(e){
  // This function loads the pages of the app, doPost is used since it can be updated constantly not just on load
   Logger.log(JSON.stringify(e))
    if(e.parameter.Button1 == 'PDHPE'){ 
      // the if statement checks in the URL for the parameter of button1 and if it matches PDHPE
      var htmlOutput =  HtmlService.createTemplateFromFile('PDHPE');
      htmlOutput.title = 'PDHPE:'; 
      return htmlOutput.evaluate();
    }if(e.parameter.Button2 == 'Back To Home Screen'){
      // the if statement checks in the URL for the parameter of button2 and if it matches Back To Home Screen
      var htmlOuptut = HtmlService.createTemplateFromFile('Title');
      htmlOuptut.title = 'Home';
      return htmlOuptut.evaluate();
    }if(e.parameter.Button3== 'Physics'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Physics');
      htmlOuptut.title = 'Physics:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button4== 'Login'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Login');
      htmlOuptut.title = 'Login:' ;
      return htmlOuptut.evaluate();
    }else{
      //This only triggers when there is an error in loading a subject page
      var htmlOutput =  HtmlService.createTemplateFromFile('error');
      htmlOutput.title = 'error:'; 
      return htmlOutput.evaluate();
    }
    }




function retrieveQuestions(questionNum, sub){
  // This function is used to load the question as a string in the variable question
  var question = subjects[sub].getRange(questionNum , 1).getValue();
  // The question is retrieved through retrieving from the cell based on the coordinates, questionNum is changed to switch which question is loaded
  return question;
}

function retrieveHide(quesitonNum, sub){
  // This function needs to be used as when the question doesn't have an image, there was a small img icon displayed
  var hide = subjects[sub].getRange(quesitonNum, 9).getValue();
  return hide
}

function retrieveHide2(quesitonNum, sub){
  // This function needs to be used as when the question doesn't have two images, there was a second small img icon displayed
  var hide = subjects[sub].getRange(quesitonNum, 11).getValue();
  return hide
}

function retrieveYear(questionNum, sub){
  // This function retrieves the hsc year that the question is from
  var QYear = subjects[sub].getRange(questionNum, 7).getValue()
  return QYear
}

function retrieveAnswerOne(questionNum, sub){
  // This function retrieves the first option
  var AOne = subjects[sub].getRange(questionNum, 2).getValue()
  return AOne
}

function retrieveAnswerTwo(questionNum, sub){
  // This function retrieves the second option
  var ATwo = subjects[sub].getRange(questionNum, 3).getValue()
  return ATwo
}

function retrieveAnswerThree(questionNum, sub){
  // This function retrieves the third option
  var AThree = subjects[sub].getRange(questionNum, 4).getValue()
  return AThree
}

function retrieveAnswerFour(questionNum, sub){
  // This function retrieves the fourth option
  var AFour = subjects[sub].getRange(questionNum, 5).getValue()
  return AFour
}

function retrieveImage(questionNum, sub){
  // This function retrieves the correlating image address if there is one
  var AImage = subjects[sub].getRange(questionNum, 8).getValue()
  var BImage = "https://lh3.googleusercontent.com/d/" + AImage;
  return BImage
}

function retrieveImage2(questionNum, sub){
  // This function will retrieve the second image address for those that need it
  var AImage = subjects[sub].getRange(questionNum, 10).getValue()
  var BImage = "https://lh3.googleusercontent.com/d/" + AImage;
  return BImage
}

function retrieveAnswer(userAns,questionNum,sub){
  // This function will retrieve which option is correct and then decide if the user was correct or wrong
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





