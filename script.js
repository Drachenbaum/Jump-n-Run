document.addEventListener('keyup', function (event) {
  var keyName = event.key;
  //alert('keyup event\n\n' + 'key: ' + keyName);
  //alert(parseInt(keyName));
  //console.log(keyName);
  switch (keyName) {
    case "ArrowUp":
      pressedKeys[0] = false;
      break;
    case "ArrowLeft":
      pressedKeys[2] = false;
      break;
    case "ArrowRight":
      pressedKeys[1] = false;
      break;
  }
});

document.onkeydown = keyPressed;
setInterval(setupMoving, 16.666);

function getPixel(x, y) {
  var pixel = ctx.getImageData(x, y, 1, 1);

  var pixelArray = [pixel.data[0], pixel.data[1], pixel.data[2]];

  return pixelArray;
}

function setupMoving() {
  //Würde man auf Plattform stoßen?
  var stossen = false;
  var abstand = 0;

  var pixel = getPixel(Math.floor(player.pos[0] + player.size[0] / 2), player.pos[1] + player.size[1]);

  //Springen
  if(pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255 && pressedKeys[0] == true) {
    player.ySpeed = 2;
  }
  //Gegen die Decke geknallt?
  var gegenDecke = false;
  var deckenAbstand = 0;

  pixel = getPixel(Math.floor(player.pos[0] + player.size[0] / 2), Math.floor(player.pos[1]-1));
  if(pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255) {
	   //alert("Gegen die Decke geknallt");
    player.ySpeed = -(player.ySpeed);
  }

  pixel = getPixel(Math.floor(player.pos[0] + player.size[0] / 2), Math.floor(player.pos[1] + player.size[1]));
  //Auf Plattform drauf?
  if (pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255) {
    player.ySpeed = 0;
  } else {
    //in der Luft
    player.ySpeed -= 0.1;

    for(var z=0; z>Math.floor(player.ySpeed); z--) {
      pixel = getPixel(Math.floor(player.pos[0] + player.size[0] / 2), player.pos[1] + player.size[1]-z);
      //Auf Plattform drauf?
      if (pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255) {
        stossen = true;
        abstand = z;
        break;
      }
    }
  }

  pixel = getPixel(Math.floor(player.pos[0] + player.size[0] / 2), player.pos[1] + player.size[1]);

  if(pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255 && pressedKeys[0] == true) {
    player.ySpeed = 4;
  }

  //Nach links und Rechts bewegen
  pixel = getPixel(Math.floor(player.pos[0] + player.size[0]), Math.floor(player.pos[1] + player.size[1]-1));
  if (pressedKeys[1] == true && !(pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255))
    player.pos[0] += 2;

  pixel = getPixel(Math.floor(player.pos[0]-1), Math.floor(player.pos[1] + player.size[1]-1));
  if (pressedKeys[2] == true && !(pixel[0] == 0 && pixel[1] == 119 && pixel[2] == 255))
    player.pos[0] -= 2;

  if(stossen) {
    player.pos[1] += abstand;
  } else {
    player.pos[1] -= player.ySpeed;
  }

  if(areYouDied())
    alert("GAME OVER");
  else
    draw();
}

function areYouDied() {
  if(!(player.pos[0] >= 0 && player.pos[0] + player.size[0] <= canvas.width && player.pos[1] + player.size[1] <= canvas.height))
    return true;
  else
    return false;
}

function draw() {
  //clear canvas
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //draw ground
  ctx.fillStyle = "#0077ff";
  for (var i = 0; i < level.plattformen.length; i++) {
    ctx.fillRect(level.plattformen[i][0], level.plattformen[i][1], level.plattformen[i][2], level.plattformen[i][3]);
  }
  /*ctx.fillStyle = "#0077ff";
  ctx.fillRect(0, 200, 100, 5);*/
  //draw player
  ctx.fillStyle = "#f00";
  ctx.fillRect(player.pos[0], Math.floor(player.pos[1]), player.size[0], player.size[1]);
}

function keyPressed(event) {
  event.cancelBubble = true;
  event.returnValue = false;

  switch (event.keyCode) {
    case 37: //links
      pressedKeys[2] = true;
      break;
    case 38: //oben
      pressedKeys[0] = true;
      break;
    case 39: //rechts
      pressedKeys[1] = true;
      break;
  }

  return event.returnValue;
}
