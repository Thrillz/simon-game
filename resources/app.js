$(document).ready(function() {
  //keeps track of the app state.
  let power = "off";
  //keeps track of 'strict'. whether on or off.
  let strict = "off";
  // keeps track of the start button.
  let running = false;
  // tracks the random colours the computer chooses.
  let colorArray = [];
  // tracks how many times the computer has choosen.
  let colorArrCounter = 0;
  // tracks the level of the game the user is in.
  let levelCount = 1;
  // tracks the color the user clicks.
  let userArray = [];
  // tracks how many colors the user has clicked.
  let userArrCounter = 0;
  // tracks if the userArray and colorArray match.
  let matchArray = true;
  // used to delay the first move by the computer.
  let runMem;
  let tempColor;
  let tempo;

  function colorButton(id, color) {
    this.id = id;
    this.color = color;
  }
  var gre = new colorButton(1, "gre");
  var red = new colorButton(2, "red");
  var yel = new colorButton(3, "yel");
  var blu = new colorButton(4, "blu");

  // power button control
  $("#powerSwitch").click(function() {
    if(power === "off") {
      $("#buttonOff").css("visibility", "hidden");
      $("#buttonOn").css("visibility", "visible");
      $("#displayText").css("opacity", "1");
      power = "on";
    }
    else if (power === "on") {
      $("#buttonOn").css("visibility", "hidden");
      $("#buttonOff").css("visibility", "visible");
      $("#displayText").css("opacity", "0.3");
      $("#strictButton").css("background-color", "yellow");
      $("#mode-led").css("background-color", "#32050C");
      $("#startButton").css("background-color", "red");
      $("#displayText").html("--");
      power = "off";
      strict = "off";
      running = false;
      colorArray = [];
      userArray = [];
      levelCount = 1;
      colorArrCounter = 0;
      userArrCounter = 0;
      matchArray = true;
    }
  });

  function common() {
    colorArray = [];
    userArray = [];
    levelCount = 1;
    colorArrCounter = 0;
    userArrCounter = 0;
    matchArray = true;
    clearInterval(runMem);
    newStart();
    console.log(colorArray + " colorArray");
    setTimeout(function() {
      runMem = setInterval(playMemory, 1000);
    }, 1000);
  }

  $("#strictButton").click(function() {
    if(power === "on" && running === false) {
      if(strict === "off") {
        $("#strictButton").css("background-color", "green");
        $("#mode-led").css("background-color", "red");
        strict = "on";
      }
      else if (strict === "on") {
        $("#strictButton").css("background-color", "yellow");
        $("#mode-led").css("background-color", "#32050C");
        strict = "off";
      }
    }
  });

  $("#startButton").click(function () {
    if (power === "on") {
      $("#startButton").css("background-color", "green");
      running = true;
      common();
    }
  });

  $("div[id *= 'button']").click(function() {
    if(power === "on" && running) {
      if(event.which === 1) {
        $("#sound" + this.id).get(0).cloneNode().play();
        userArray.push(this.id.slice(6, 9));
        //console.log(userArray + " haha");
        userArrCounter++;

        for (var i = 0; i < userArray.length; i++) {
          if (colorArray[i] != userArray[i]) {
            matchArray = false;
          }
        }

        if (!matchArray) {
          $("#displayText").html("!!");
          $("#soundbuttonWrong").get(0).play();
          userArray = [];
          colorArrCounter = 0;
          userArrCounter = 0;
          matchArray = true;
          if (strict === "on") {
            colorArray = [];
            levelCount = 1;
            newStart();
            console.log(colorArray);
            setTimeout(function() {
              runMem = setInterval(playMemory, tempo);
            }, 1000);
          }
          else {
            setTimeout(function() {
              runMem = setInterval(playMemory, tempo);
            }, 1000);
          }
        }

        else {
          if(userArrCounter === colorArrCounter) {
            if (matchArray) {
              if (levelCount === 20) {
                win();
              }
              else {
                userArray = [];
                colorArrCounter = 0;
                userArrCounter = 0;
                newStart();
                levelCount++;

                switch (levelCount) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                    tempo = 1000;
                    break;
                  case 5:
                    tempo = 700;
                    break;
                  case 9:
                    tempo = 500;
                    break;
                  case 13:
                    tempo = 300;
                    break;
                }
                setTimeout(function() {
                  runMem = setInterval(playMemory, tempo);
                }, 1000);
              }
            }
          }
        }
      }
    }
  });

  function newStart() {
    let rand = Math.floor((Math.random()*4) + 1);
    switch (rand) {
      case 1:
        colorArray.push("Gre");
        break;
      case 2:
        colorArray.push("Red");
        break;
      case 3:
        colorArray.push("Yel");
        break;
      case 4:
        colorArray.push("Blu");
        break;
    }
  }

  function playMemory() {
    $("#displayText").html(levelCount);
    tempColor = colorArray[colorArrCounter];
    //console.log(tempColor + " temp");
    $("#soundbutton" + tempColor).get(0).cloneNode().play();
    $("#button" + tempColor).addClass("activated");
    setTimeout(function() {
      $("#button" + tempColor).removeClass("activated");
    }, 250);
    colorArrCounter++;
    //console.log(colorArrCounter  + " c1");
    if(colorArrCounter === colorArray.length) {
      //console.log(colorArrCounter + " c2");
      clearInterval(runMem);
    }
  }

  function win() {
  $("#displayText").html("WIN");
  $("#buttonGre").addClass("activated");
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1000);

  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1500);

  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 2000);

  setTimeout(function() {
    common();
  }, 3000);
}
});
