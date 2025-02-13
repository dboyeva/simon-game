var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(document).one("keydown", function() {
  if (gameStarted === false) {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    nextSequence();
  }
});

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  var lastIndex = userClickedPattern.length - 1;

  if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
    console.log("Success.");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("Wrong.");
    playSound("wrong");
    $(document.body).addClass("game-over")
    setTimeout(function() {
      $(document.body).removeClass("game-over")
    }, 200);
    $("h1").text("Game Over! Press A Key to Restart");
    $(document).one("keydown", function () {
      startOver();
  });

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false;
  nextSequence();
    }
  }
}
