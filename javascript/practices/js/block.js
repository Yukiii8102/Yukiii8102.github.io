var box = document.querySelector(".box");
var bodyw = document.body.clientWidth;
var bodyh = document.body.clientHeight;
var left = 0;
var boxtop = 0;
var minus;

function moveRight() {
    minus = bodyw - left - 100;
    if (minus < 10) {
        left += minus;
    } else {
        left += 10;
    }
    box.style.left = left + "px";
}

function moveDown () {
    minus = bodyh - boxtop - 100;
    if (minus < 10) {
        boxtop += minus;
    } else {
        boxtop += 10;
    }
    box.style.top = boxtop + "px";
}

function moveLeft () {
    if (left > 10) {
        left -= 10;
    } else {
        left = 0;
    }
    console.log(minus);
    box.style.left = left + "px";
}

function moveUp () {
    if (boxtop > 10) {
        boxtop -= 10;
    } else {
        boxtop = 0;
    }
    box.style.top = boxtop + "px";
}

function moving () {
    if ((bodyw - left) > 100 && boxtop == 0) {
        moveRight();
    } else if ((bodyh - boxtop) > 100 && left > 0) {
        moveDown();
    } else if ((bodyh - boxtop) == 100 && left > 0) {
        moveLeft();
    } else if (left == 0 && boxtop >= 0) {
        moveUp();
    }
}

timer = setInterval ( function () {
    moving ();
},50);

// document.body.onkeydown = function (ev) {
//     if (ev.keyCode === 39) {
//         moving();
//     }
// }