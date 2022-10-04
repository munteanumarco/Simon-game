function generateRandomButton() {
  var number = Math.floor(Math.random() * 4);
  return number;
}


var gameInProgress = 0;
var colors = ["green", "red", "yellow", "blue"];
var level = 0;
var solutionOrder = [];
var userOrder = [];

$(document).keydown(function(event){
  if (!gameInProgress){
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userOrder.push(userChosenColor);

  animateButton(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userOrder.length-1);

});

function checkAnswer(position) {
  if (userOrder[position] === solutionOrder[position]){
    if (userOrder.length == solutionOrder.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  gameInProgress = 1;
  userOrder = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomColor = colors[generateRandomButton()];
  solutionOrder.push(randomColor);

  playSound(randomColor);
  animateButton(randomColor);
}

function animateButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  },100);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function startOver() {
  solutionOrder = [];
  level = 0;
  gameInProgress = 0;
}
