//TODO: variables: correct, incorrect, unanswered
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var triviaIndex = 0;
var radioValue = -1;
var questionIntervalID;
var questionClockRunning = false;
var questionTime=0;
var resultIntervalID;
var resultClockRunning = false;
var resultTime=0;
var trivia = [
    {question:"q0", choices:["a10","a20","a30","a40"], answer:"a20"},
    {question:"q1", choices:["a11","a21","a31","a41"], answer:"2"},
    {question:"q2", choices:["a12","a22","a32","a42"], answer:"4"},
    {question:"q3", choices:["a13","a23","a33","a43"], answer:"3"},
    {question:"q4", choices:["a14","a24","a34","a44"], answer:"1"},
    {question:"q5", choices:["a15","a25","a35","a45"], answer:"4"},
    {question:"q6", choices:["a16","a26","a36","a46"], answer:"3"},
    {question:"q7", choices:["a17","a27","a37","a47"], answer:"3"},
    {question:"q8", choices:["a18","a28","a38","a48"], answer:"2"},
    {question:"q9", choices:["a19","a29","a39","a49"], answer:"2"},
]

// start question timer 
function startQuestionTimer(){
    if(!questionClockRunning){
        questionClockRunning = true;
        questionTime = 5;
        questionIntervalID = setInterval(function(){checkGameStatus()}, 1000);
    }
    $("#time").text(questionTime);
    }

// stop question timer
function stopQuestionTimer(){
    if(questionClockRunning){
        clearInterval(questionIntervalID);
        questionClockRunning = false;
    }
}

// start result timer 
function startResultTimer(){
    if(!resultClockRunning){
        resultClockRunning = true;
        resultTime = 3;
        resultIntervalID = setInterval(function(){
            stopResultTimer();
            triviaIndex++;
            // keep going until all questions posed.
            if(triviaIndex < trivia.length){
                $("#questionDisplay").show();
                $("#time").text(resultTime);
                startQuestion();
            }
            else{
                $("#answerDisplay").hide();
                $("#gameResultsDisplay").show();
            }
            ;}            
            ,resultTime);

    }
}

// stop result timer
function stopResultTimer(){
    if(resultClockRunning){
        clearInterval(resultIntervalID);
        resultClockRunning = false;
    }
}

// intialize and start game
function init(){
    triviaIndex=0;
    correct=0;
    incorrect=0;
    $("#startButtonDisplay").hide();
    $("#gameResultsDisplay").hide();
    $("#questionDisplay").show();
    startQuestion();
}

// load new question and start timer
function startQuestion(){
    $("#question").text(trivia[triviaIndex].question);
    $("#choiceLabel1").text(trivia[triviaIndex].choices[0]);
    $("#choiceLabel2").text(trivia[triviaIndex].choices[1]);
    $("#choiceLabel3").text(trivia[triviaIndex].choices[2]);
    $("#choiceLabel4").text(trivia[triviaIndex].choices[3]);    
    startQuestionTimer();
    $("#timeDisplay").show();
}

// checks if timer is up and whether game is over.
function checkGameStatus(){
    questionTime--;

    // check if time to answer question has expired
    if(questionTime <= 0){
        $("#questionDisplay").hide();
        $("#answerDisplay").show();
        $("#timeDisplay").hide();
        displayQuestionResult(false, "Out of Time!");
        stopQuestionTimer();
        startResultTimer();
        incorrect++;
    }

    $("#time").text(questionTime);

}


// check whether answer was correct
function checkAnswer(radioValue){
    $("#questionDisplay").hide();
    $("#answerDisplay").show(); 
    $("#timeDisplay").hide();
    if(trivia[triviaIndex].choices[radioValue] === trivia[triviaIndex].answer){
        displayQuestionResult(true, "Correct!");
        correct++;      
    }
    else{
        displayQuestionResult(false, "Heck No!"); 
        correct--;       
    }
    stopQuestionTimer();
    startResultTimer();
}

// display whether answer was correct. If incorrect display answer.
function displayQuestionResult(isCorrect, message){
    if(isCorrect){
        console.log("correct");
        $("#questionResult").text(message);
        $("#answer").text("");
    }
    else{
        console.log("wrong");        
        $("#questionResult").text(message);
        $("#answer").text("The correct answer was: " + trivia[triviaIndex].answer);
    }
}

//TODO: display start button to start game. init ();
//TODO: when start button pressed reset variables.
//TODO: load first question. question has mutually exclusive answers
//TODO: start timer. Possibly display spinner.
//TODO: if answered within time show whether correct of not.
//TODO: if answer correct display correct answer, "Correct!", and increment correct variable
//TODO: if answer incorrect display correct answer, "Incorrect" and increment incorrect variable.
//TODO: if no answer within time show correct answer and "Out of time!"
//TODO: after last question display correct, incorrect, and unanswered. with "Start Over?" button
//TODO: "Start over?" button restarts the game. init();

$(document).ready(function() {

    // player choose an answer
    $("input[type='radio']").click(function(){
        radioValue = $("input[name='choiceRadios']:checked").val();
        console.log("Your are a - " + radioValue);
        checkAnswer(radioValue);        
    });

    // start game
    $("#startButton").click(function(){
        init();
    });

    // restart game
    $("#reStartButton").click(function(){
        init();
    });
    
});