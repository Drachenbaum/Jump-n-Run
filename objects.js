var player = {
  /*
    X________
    |        |
    |        |
    |        |
    |________|
//Comment
    x, y
  */
  pos: [100, 160],
  size: [25, 25],

  ySpeed: 0,

  /*
    0: oben
    1: rechts
    2: links
    3: none
  */
  orientation: 3
};

var level = {
  height: 500,
  width: 500,
  plattformen: [[0, 210, 200, 5],
				        [0, 100, 200, 50],
                [190, 100, 200, 200],
                [0, 0, 50, 500],
                [0, 250, 300, 5]]
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pressedKeys = [false, false, false];
//             oben,  rechts, links


/*
  Colours:
    player: red;
    ground: blue;
*/

//fillStyle(x ,y, breite, hoehe);
