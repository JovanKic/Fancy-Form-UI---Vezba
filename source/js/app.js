
// JavaScript
//Questions Array
var questions = [
    {question: 'Your First Name'},
    {question: 'Your Last Name'},
    {question: 'Your Email', pattern: /\S+@\S+\.\S+/},
    {question: 'Create A Password', type: 'password'}
];
//Transition Times
var shakeTime = 100; //Shake transition Time
var switchTime = 200; //Transition Between Questions
//Initialize Position At First Question
var position = 0;
//Initialize DOM Elements
//getElementById could be used instead of query selector, but this is more modern, and takes CSS selector as its only parameter, the only drawback is browser support
var formBox = document.querySelector('#form-box'),
      nextBtn = document.querySelector('#next-btn'),
      prevBtn = document.querySelector('#prev-btn'),
      inputGroup = document.querySelector('#input-group'),
      inputField = document.querySelector('#input-field'),
      inputLabel = document.querySelector('#input-label'),
      inputProgress = document.querySelector('#input-progress'),
      progress = document.querySelector('#progress-bar');
//EVENTS
//get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);
//inputField enter click
inputField.addEventListener('keyup', function(e) {
    if(e.keyCode == 13) {
        validate();
    }
})
//Next button click
nextBtn.addEventListener('click',validate);
//FUNCTIONS
//Get Question From Array & Add To Markup
function getQuestion() {
    //Get The Current Question
    inputLabel.innerHTML = questions[position].question;
    //Get Current Type
    //if it doesnt have the type property, than those will be text
    inputField.type = questions[position].type || 'text';
    //Get The Current Answer (which will either be what the user puts in or nothing)
    inputField.value = questions[position].answer || '';
    //Focus on the current element (u use this thing for example if u press a button it focuses u on the text field and shit like that)
    inputField.focus();
    //Set progress bar width - Variable to the questions length
    progress.style.width = (position*100) / questions.length + '%';
    //Add user icon if its the first question, otherwise a back arrow
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
    //getQuestion() kinda structures everything, showQuestion() will display it on the page
    showQuestion();
}
//Display the question to the user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}
//Hide the answered question
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}
//Transform to create shake motion
function transform(x,y) {
    console.log('x:'+x,'y:'+y);
    formBox.style.transform = 'translate' + '(' + x + 'px' + ',' + y + 'px' +')';
    // formBox.style.transform = `translate(${x}px, ${y}px)`;
}
//Validate field
function validate() {
    //Make sure pattern matches if there is one (there is for email)
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}
//Field input fail
function inputFail() {
    formBox.className = 'error';
    //Repeat shake motion - set i to number of shakes (6 bcs 3 for left and 3 for right side)
    for (var i=0; i<6; i++) {
        setTimeout(transform, shakeTime*i, ((i%2)*2-1)*20, 0);
        if(i == 5){
            setTimeout(transform, shakeTime*6, 0, 0);
        }
        inputField.focus();
    }
}
//Field input pass
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime*0, 0, 10);
    setTimeout(transform, shakeTime*1, 0, 0);
    //store answer in the array
    questions[position].answer = inputField.value;
    //Increment the position (change question)
    position++;
    //if new question hide current and get next
    if(questions[position]){
        hideQuestion();
        getQuestion();
    } else {
        //remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';
        //form complete
        formComplete();
    }
}
//All field complete - show h1 with the class of end
function formComplete() {
    console.log(questions);
    var h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode('Thanks ' + questions[0].answer + ', you are now registered.'));
    //we want it to fade in:
    setTimeout(function() {
        formBox.parentElement.appendChild(h1);
        setTimeout(function() {
            h1.style.opacity = 1;
        }, 50);
    }, 1000);
}
