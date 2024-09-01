


function doGet(e) {
  // This function loads the main page on web load
  Logger.log(e)
  var htmlOuptut = HtmlService.createTemplateFromFile('Account');
  htmlOuptut.title = 'Account';
  var cache = CacheService.getScriptCache();
  cache.removeAll(['Score' , 'UID'])
  cache.put('Score' , 0)
  cache.put('UID', '')
  return htmlOuptut.evaluate();
}

// This is the information about the spreadsheet that is used to import the information into the program
var id = "1TPZQT-IbFCgTNSzJ4ZIJiw_slmi8FpU4-HDUnyfvv8k";
var spreadsheet = SpreadsheetApp.openById(id);
var subjects = []
// Each subject has its own page in the spreadsheet that is stored in the array title subjects
subjects[0]  = spreadsheet.getSheetByName("PE");
subjects[1] = spreadsheet.getSheetByName("Physics")
var creds = spreadsheet.getSheetByName("Credential")


function setUserID(email){
  var length = creds.getDataRange().getNumRows();
  var cache = CacheService.getScriptCache();
  const data = creds.getRange(1, 1, length).getValues();
  for (var counter = 1; counter < length; counter = counter + 1) {
    Logger.log(data[counter])
    if (data[1, counter] == email){
      cache.put('UID', counter);
      var row = counter;
    }
  }
  return row;
}



function updatePhysics(subScore){
var cache = CacheService.getScriptCache();
var uID = cache.get('UID');
var intUID = parseInt(uID) + 1;
var oldScore = creds.getRange(intUID, '5').getValue();
var newScore = (oldScore) + subScore;
creds.getRange(intUID, '5', '1').setValue(newScore)
var currentScore = creds.getRange(intUID, 3, 1).getValue();
// var sessionScore = cache.get('Score');
// var intSessionScore = parseInt(sessionScore);
var updatedScore = currentScore + subScore;
  creds.getRange(intUID, '3').setValue(updatedScore)
  cache.put('Score', '0')
}

function updatePe(subScore){
var cache = CacheService.getScriptCache();
var uID = cache.get('UID');
var intUID = parseInt(uID) + 1;
var oldScore = creds.getRange(intUID, 4).getValue();
var newScore = (oldScore) + subScore;
creds.getRange(intUID, 4).setValue(newScore)
var currentScore = creds.getRange(intUID, 3, 1).getValue();
// var sessionScore = cache.get('Score');
// var intSessionScore = parseInt(sessionScore);
var updatedScore = currentScore + subScore;
  creds.getRange(intUID, '3').setValue(updatedScore)
  cache.put('Score', '0')
}

function updateTotal(subScore){
var cache = CacheService.getScriptCache();
var uID = cache.get('UID');
var intUID = parseInt(uID) + 1;
var oldScore = creds.getRange(intUID, 3).getValue();
var newScore = (oldScore) + subScore;
creds.getRange(intUID, 3).setValue(newScore)
var currentScore = creds.getRange(intUID, 3, 1).getValue();
var sessionScore = cache.get('Score');
var intSessionScore = parseInt(sessionScore);
var updatedScore = currentScore + intSessionScore;
  creds.getRange(intUID, '3').setValue(updatedScore)
  cache.put('Score', '0')
}

function initialiseScore(uID){
  creds.getRange(uID+1, '3').setValue(0)
  creds.getRange(uID+1, '5').setValue(0)
  creds.getRange(uID+1, '4').setValue(0)
}

/**
 * Checks the provided login credentials against the data in the spreadsheet.
 *{string} email - The user's email.
 *{string} password - The user's password.
 * return {boolean} True if credentials match, false otherwise.
 */
function checkLogin(email, password) {
  // Access the specific sheet where credentials are stored
  const login = spreadsheet.getSheetByName('Credential');
  // Retrieve all data from the sheet
  const data = login.getDataRange().getValues();
  
  // Loop through the data to find a matching email and password
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] == email && data[i][1] == password) {
      return true; // Match found
    }
  }
  return false; // No match found
}



/**
 * Registers a new user by adding their credentials to the spreadsheet.
 * Throws an error if the user already exists.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 */
function registerNewUser(email, password) {
  // Access the specific sheet where credentials are stored
  const login = spreadsheet.getSheetByName('Credential');
  // Retrieve all data from the sheet
  const data = login.getDataRange().getValues();

  // Check if the email already exists in the spreadsheet
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] == email) {
      throw new Error('User already exists');
    }
  }
  // Append the new user's email and password to the spreadsheet
  login.appendRow([email, password]);
  return(email)
}

// function checkUser(email, password){
//  const login = spreadsheet.getSheetByName('Credential');
//  const data = login.getDataRange().getValues();
//  var isNew = true

//   for(let i = 0; i < data.length; i++) {
//     if(data[i][0] == email) {
//       var isNew = false
//     }
//   }
//   return isNew
// }


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
function loggedIn (){
  Logger.log("Logged In")
}

function updateSession(subScore){
  var cache = CacheService.getScriptCache();
  var sessionScore = cache.get('Score');
  sessionScore = parseInt(sessionScore) + subScore;
  var sessionString = sessionScore.toString();
  cache.put('Score' , sessionString);
  Logger.log(sessionScore)
}

function displayScore(){
  var cache = CacheService.getScriptCache();
  var showScore = cache.get('Score');
  Logger.log(showScore)
  return showScore
}

// Button1 is for PDHPE
// Button2 is for Home screen
// Button3 is for Physics
// Button4 is for Login
// Button5 is for Creating an account
// Button6 is for Setting
function doPost(e){
  // This function loads the pages of the app, doPost is used since it can be updated constantly not just on load
   Logger.log(JSON.stringify(e))
    if(e.parameter.Button1 == 'PDHPE'){ 
      // the if statement checks in the URL for the parameter of button1 and if it matches PDHPE
      var htmlOutput =  HtmlService.createTemplateFromFile('PDHPE');
      htmlOutput.title = 'PDHPE:'; 
      return htmlOutput.evaluate();
    }if(e.parameter.Button10 == 'Account'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Account');
      htmlOuptut.title = 'Account:' ;
      return htmlOuptut.evaluate();
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
    }if(e.parameter.Button5== 'Create'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Create');
      htmlOuptut.title = 'Create:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button6== 'Settings'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Settings');
      htmlOuptut.title = 'Settings:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button7== 'Initial_Create'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Initial_Create');
      htmlOuptut.title = 'Create:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button8== 'Initial_Login'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Initial_Login');
      htmlOuptut.title = 'Login:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button9== 'Score'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Score');
      htmlOuptut.title = 'Score:' ;
      return htmlOuptut.evaluate();
    }if(e.parameter.Button10== 'Account'){
      // the if statement checks in the URL for the parameter of button3 and if it matches Physics
      var htmlOuptut = HtmlService.createTemplateFromFile('Account');
      htmlOuptut.title = 'Account:' ;
      return htmlOuptut.evaluate();
    }else{
      //This only triggers when there is an error in loading a subject page
      var htmlOutput =  HtmlService.createTemplateFromFile('error');
      htmlOutput.title = 'error:'; 
      return htmlOutput.evaluate();
    }
    }



function retrieveOverall(){
  var cache = CacheService.getScriptCache();
  var uID = cache.get('UID');
  var row = parseInt(uID);
  var totalScore = creds.getRange(row+1, 3, 1).getValue();
  return totalScore
}

function retrievePhysics(){
  var cache = CacheService.getScriptCache();
  var uID = cache.get('UID');
  var row = parseInt(uID);
  var physicsScore = creds.getRange(row+1, 5, 1).getValue();
  return physicsScore
}

function retrievePdhpe(){
  var cache = CacheService.getScriptCache();
  var uID = cache.get('UID');
  var row = parseInt(uID);
  var peScore = creds.getRange(row+1, 4, 1).getValue();
  return peScore
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





