var ball = document.getElementById("ball");
var ballStyle = ball.currentStyle ? ball.currentStyle : window.getComputedStyle(ball, null);
var ballSizeX = parseInt(ballStyle.width);
var ballSizeY = parseInt(ballStyle.height);
var ballPositionX = parseInt(ballStyle.left);
var ballPositionY = parseInt(ballStyle.top);

var speed = 5;
var direction = 'right';

var moveRight = function () {
    ballPositionX += speed;
    ball.style.left = ballPositionX + 'px';
}
var moveLeft = function () {
    ballPositionX -= speed;
    ball.style.left = ballPositionX + 'px';
}
var moveBottom = function () {
    ballPositionY += speed;
    ball.style.top = ballPositionY + 'px';
}
var moveTop = function () {
    ballPositionY -= speed;
    ball.style.top = ballPositionY + 'px';
}

var checkPengzhuang = function () {
    if (ballPositionX <= 0) {
        direction = 'right';
    } else if (ballPositionX >= 400-20) {
        direction = 'left';
    } else if (ballPositionY <= 0) {
        direction = 'down';
    } else if (ballPositionY >= 400-20) {
        direction = 'up';
    }
}

document.body.onkeydown = function (ev) {
    switch (ev.keyCode) {
        case 37:
            direction = 'left';
            break;
        case 38:
            direction = 'up';
            break;
        case 39:
            direction = 'right';
            break;
        case 40:
            direction = 'down';
            break;
        default:
            return;
    }
}

var move = setInterval(function () {
    checkPengzhuang();
    if (direction == 'right') {
        moveRight();
    } else if (direction == 'left') {
        moveLeft();
    } else if (direction == 'down') {
        moveBottom();
    } else if (direction == 'up') {
        moveTop();
    }
}, 20);