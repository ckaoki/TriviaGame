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
    {question:"What 80s TV show had character BA Baracus?", choices:["The Golden Girls","Family Ties","A Team","Cheers"], answer:"A Team", img:"ATeam.jpg"},
    {question:"What 80s TV show made blazers with t-shirts cool?", choices:["MASH","The Cosby Show","Hill Street Blues","Miami Vice"], answer:"Miami Vice", img:"MiamiVice.jpg"},
    {question:"What 80s TV show had a main charactor who was also James Bond?", choices:["Remington Steele","Cheers","Who's the Boss?","Cagney and Lacey"], answer:"Remington Steele", img:"ATeam.jpg"},
    {question:"What 80s TV show was based in Hawaii?", choices:["Moonlighting","Perfect Strangers","MASH","Magnum PI"], answer:"Magnum PI", img:"MagnumPI.jpg"},
    {question:"What 80s TV show had a talking car?", choices:["A Team","The Golden Girls","Knight Rider","The Wonder Years"], answer:"Knight Rider", img:"KnightRider.jpg"},
    {question:"What 80s TV show starred and alien?", choices:["The Cosby Show","ALF","Cheers","Growing Pains"], answer:"ALF", img:"ALF.jpg"},
    {question:"What 80s TV show starred Balki Bartokomous?", choices:["Knight Rider","A Team","Who's the Boss?","Perfect Strangers"], answer:"Perfect Strangers", img:"PerfectStrangers.jpg"},
    {question:"What 80s TV show was about girls at a boarding school?", choices:["Family Ties","The Facts of Life","Growing Pains","Cheers"], answer:"The Facts of Life", img:"TheFactsOfLife.jpg"},
    {question:"What 80s TV show had a character who said 'what you talkin bout willis?'", choices:["Different Strokes","The Cosby Show","A Team","Miami Vice"], answer:"Different Strokes", img:"DifferentStrokes.jpg"},
    {question:"What 80s TV show was set at a Boston Bar?", choices:["Moonlighting","The Cosby Show","The Facts of Life","Cheers"], answer:"Cheers", img:"Cheers.jpg"},
]

// start question timer 
function startQuestionTimer(){
    if(!questionClockRunning){
        questionClockRunning = true;
        questionTime = 10;
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
        resultTime = 5;
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
                displayGameResults();                
            }
            $("#answerDisplay").hide();
        }, resultTime*1000);
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
    unanswered=0;
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
        unanswered++;
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
        incorrect++;       
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
    $("#answerImage").attr("src", "assets/images/" + trivia[triviaIndex].img);
}

function displayGameResults(){
    $("#gameResultsDisplay").show();
    var p1 = $("<p>").css("font-size", "24px");
    var p2 = $("<p>").css("font-size", "24px");
    var p3 = $("<p>").css("font-size", "24px");
    p1.text("Correct: " + correct);
    p2.text("Incorrect: " + incorrect);
    p3.text("Unanswered: " + unanswered);
    $("#gameStats").empty();
    $("#gameStats").append(p1);
    $("#gameStats").append(p2);
    $("#gameStats").append(p3);
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