var value00 = 0;
var value01 = 0;
var value10 = 0;
var value11 = 0;
var lastValue;
var userValue;

$( document ).ready(function(){
  if ( $( "body" ).hasClass( "login" ) ) {
    $( "#game").hide();	  
  }    
  if ( $( "body" ).hasClass( "game" ) ) {
    $( "#login").hide();	  
  }  
});

function play() {
  teachAI();

  if (document.getElementById("mode").value==1){
    var aiValue = getRandomValue();
  }else{
    var aiValue = getValue();
  }

  if(userValue == aiValue){
    var aiScore = document.getElementById("score1").innerHTML;
    aiScore ++;
    document.getElementById("score1").innerHTML=aiScore;
  }

  if(userValue != aiValue){
    var playerScore = document.getElementById("score2").innerHTML;
    playerScore++;
    document.getElementById("score2").innerHTML=playerScore;
  }

  lastValue=userValue;
  checkWin();
  nextRound();
}

function animateLogo(){
  $("#logo").animate({marginLeft:600}, 'slow');
  $("#logo").animate({marginLeft:0}, 'slow');
  $("#logo").animate({marginRight:600}, 'slow');
  $("#logo").animate({marginRight:0}, 'slow');
}

function teachAI(){
  if(lastValue==0 && userValue==0){
    //alert("Value00 ++")
    value00++;
  }

  if(lastValue==0 && userValue==1){
    //alert("Value01 ++")
    value01++;
  }

  if(lastValue==1 && userValue==0){
    //alert("Value10 ++")
    value10++;
  }
  
  if(lastValue==1 && userValue==1){
    //alert("Value11 ++")
    value11++;
  }
}

function nextRound(){
    document.getElementById("rounds").value--;
}

function checkWin(){
  var aiScore = document.getElementById("score1").innerHTML;
  var playerScore = document.getElementById("score2").innerHTML;

  if(document.getElementById("rounds").value==1){
      if(aiScore > playerScore){
        setTimeout(()=>{
          alert("Gana ia");
          endGame();
        },1)
      }
      if(aiScore < playerScore){
        setTimeout(()=>{
          alert("Gana " + document.getElementById("name").value);
          endGame();
        },1)
      }
      if(aiScore == playerScore){
        setTimeout(()=>{
          alert("Empate");
          endGame();
        },1)
      }
  }
}

function startGame(){
  hideLogin();
}

function endGame(){
  $("#game").fadeOut();
  $("#game").hide();
  resetGame();
  $("#login").fadeIn();
  $("#login").show();
}

function resetGame(){
  document.getElementById("score1").innerHTML=0;
  document.getElementById("score2").innerHTML=0;
  document.getElementById("rounds").value=0;
  document.getElementById("name").value="";
  document.getElementById('showRounds').innerHTML=1;
}

function getValue(){
  //First 
  if(value00 == 0 && value01 == 0 && value10 == 0 && value11 == 0){
    return getRandomValue();
  }

  //Last value 1
  if(lastValue==1){
    if(value11>value01){
      return 1;
    }
    if(value11<value01){
      return 0;
    }
    if(value11==value01){
      return getRandomValue();
    }

  //Last value 0
  }else{
    if(value10>value00){
      return 1;
    }
    if(value10<value00){
      return 0;
    }
    if(value10==value00){
      return getRandomValue();
    }
  }
}

function getRandomValue(){
  var num =  Math.floor((Math.random() * 200) + 1);

  if(num >= 100){
    return 0;
  }

  return 1;
}

//Preguntar
function getRandomValue2(x){
  var num=(22695477*x+1)%(2**32); 

  if(num >= (2**31)){
    return 0;
  }

  return 1;
}

function hideLogin(){
  $("#login").fadeOut();
  $("#login").hide();
  $("#game").fadeIn();
  $("#game").show();
}