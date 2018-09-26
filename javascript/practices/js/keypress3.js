var ball = document.getElementById("ball");
var ballStyle = ball.currentStyle ? ball.currentStyle : window.getComputedStyle(ball, null);
var ballSizeX = parseInt(ballStyle.width);
var ballSizeY = parseInt(ballStyle.height);
var ballPositionX = parseInt(ballStyle.left);
var ballPositionY = parseInt(ballStyle.top);

var speedX = 5;
var speedY = 2;

var checkPengzhuang = function () {
    if (ballPositionX <= 0 || ballPositionX >= 400-20) {
        speedX = -speedX;
    } else if (ballPositionY <= 0 || ballPositionY >= 400-20) {
        speedY = -speedY;
    }
}

var moving = function() {
    ballPositionX += speedX;
    ballPositionY += speedY;
    ball.style.left = ballPositionX + 'px';
    ball.style.top = ballPositionY + 'px';
}

document.body.onkeydown = function (ev) {
    switch (ev.keyCode) {
        case 37:
            speedX = -Math.abs(speedX);
            break;
        case 38:
            speedY = -Math.abs(speedY);
            break;
        case 39:
            speedX = Math.abs(speedX);
            break;
        case 40:
            speedY = Math.abs(speedY);
            break;
        default:
            return;
    }
}

var id = setInterval(function () {
    checkPengzhuang();
    moving();
}, 20);