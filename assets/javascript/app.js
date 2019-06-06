//TODO: variables: correct, incorrect, unanswered
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var triviaIndex = 3;

var Trivia = [
    {question:"q0", answer1:"a10", answer2:"a20", answer3:"a30", answer4:"a40"},
    {question:"q1", answer1:"a11", answer2:"a21", answer3:"a31", answer4:"a41"},
    {question:"q2", answer1:"a12", answer2:"a22", answer3:"a32", answer4:"a42"},
    {question:"q3", answer1:"a13", answer2:"a23", answer3:"a33", answer4:"a43"},
    {question:"q4", answer1:"a14", answer2:"a24", answer3:"a34", answer4:"a44"},
    {question:"q5", answer1:"a15", answer2:"a25", answer3:"a35", answer4:"a45"},
    {question:"q6", answer1:"a16", answer2:"a26", answer3:"a36", answer4:"a46"},
    {question:"q7", answer1:"a17", answer2:"a27", answer3:"a37", answer4:"a47"},
    {question:"q8", answer1:"a18", answer2:"a28", answer3:"a38", answer4:"a48"},
    {question:"q9", answer1:"a19", answer2:"a29", answer3:"a39", answer4:"a49"},
]

function init(){

}

function loadQA(){
    $("#question").text(Trivia[triviaIndex].question);
    $("#answerLabel1").text(Trivia[triviaIndex].answer1);
    $("#answerLabel2").text(Trivia[triviaIndex].answer2);
    $("#answerLabel3").text(Trivia[triviaIndex].answer3);
    $("#answerLabel4").text(Trivia[triviaIndex].answer4);
    
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
    console.log( "ready!" );
    loadQA();
    $("#timeRemaining").text("0");
    $("input[type='radio']").click(function(){
        var radioValue = $("input[name='answerRadios']:checked").val();
        if(radioValue){
            alert("Your are a - " + radioValue);
        }
    });
    //  $("#answer4").attr("class", "form-check visible");
    //  $("#temp").text(Trivia[1].question);
});