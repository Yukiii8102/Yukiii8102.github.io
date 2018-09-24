var btns = document.getElementById("btns");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var close = document.getElementById("close");
var text = document.getElementById("text");
var p = document.getElementById("paragraph");

var timer;
var clo = true;

btn1.onclick = function () {
    timer = setInterval( function () {
        p.innerHTML = "";
        p.style.opacity = "0";
        setTimeout( function () {
            p.innerHTML = "paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 ";
            p.style.opacity = "1";
            clearInterval(timer);
        }, 200);
    },10);
}

btn2.onclick = function () {
    timer = setInterval( function () {
        p.innerHTML = "";
        p.style.opacity = "0";
        setTimeout( function () {
            p.innerHTML = "paragraph2 paragraph1 paragraph1 paragraph1 \
                        paragraph2 paragraph1 paragraph1 paragraph1 \
                        paragraph2 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 \
                        paragraph1 paragraph1 paragraph1 paragraph1 ";
            p.style.opacity = "1";
            clearInterval(timer);
        }, 200);
    },10);
}

close.onclick = function () {
    if (clo) {
        text.style.transition = "all .5s";
        text.style.height = "0px";
        text.style.transform = "translateY(-1px)";
        close.innerHTML = "∨";
        clo = !clo;
    } else {
        text.style.height = "300px";
        text.style.transform = "translateY(0px)";
        close.innerHTML = "×";
        clo = !clo;
    }
}