var pointer = document.getElementById("pointer");
var zhuanpan = document.getElementById("zhuanpan");
var click = true;

pointer.onclick = function () {
    if (click) {
        click = !click;
        zhuanpan.style.transition = "all 0s";
        zhuanpan.style.transform = "rotate(0deg)";
        choujiang();
    }
}

function choujiang() {
    var timer;
    var currentAngle = 0;
    var x = 0;
    clearInterval(timer);
    timer = setInterval (function () {
        if (Math.floor(currentAngle / 360) < 3) {
            currentAngle = Math.floor(Math.random() * 3600);
        } else {
            zhuanpan.style.transition = "all 4s";
            zhuanpan.style.transform = "rotate("+(currentAngle + 4)+"deg)";
            x = Math.floor(currentAngle%360 / 51.4) + 1;
            console.log(currentAngle);
            console.log(currentAngle % 360);
            console.log(x);
            clearInterval(timer);
            setTimeout(function () {
                click = !click;
                switch (x)
                {
                    case 1 :
                        alert("免单4999元");
                        break;
                    case 2 : 
                        alert("免单50元");
                        break;
                    case 3 :
                        alert("免单10元");
                        break;
                    case 4 :
                        alert("免单5元");
                        break;
                    case 5 :
                        alert("免分期服务费");
                        break;
                    case 6 :
                        alert("提高白条额度");
                        break;
                    default :
                        alert("未中奖");
                        break;
                }
            }, 4000);
        }
    }, 30);
}