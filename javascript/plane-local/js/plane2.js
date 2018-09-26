var stageDiv = document.getElementById("stage");
var startDiv = document.getElementById("start");
var mainDiv = document.getElementById("main");
var scoreDiv = document.getElementById("score");
var menuDiv = document.getElementById("menu");
var continueDiv = document.getElementById("continue");
var restartDiv = document.getElementById("restart");
var settlementDiv = document.getElementById("settlement");

var score = 0;

//搭建画面
var stageStyle = stageDiv.currentStyle? stageDiv.currentStyle : window.getComputedStyle(stageDiv, null);
var stageSizeX = parseInt(stageStyle.width);
var stageSizeY = parseInt(stageStyle.height);

var Plane = function(centerX, centerY, planeModel, speed) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.sizeX = planeModel.width;
    this.sizeY = planeModel.height;
    this.imgSrc = planeModel.imgSrc;
    this.hitSrc = planeModel.hitSrc;
    this.boomSrc = planeModel.boomSrc;
    this.boomTime = planeModel.boomTime;
    this.hp = planeModel.hp;
    this.speed = speed;

    this.currentX = this.centerX - this.sizeX/2;
    this.currentY = this.centerY - this.sizeY/2;
}

var ourPlane = {
    width: 66,
    height: 80,
    imgSrc: "images/our-plane.gif",
    boomSrc: "images/our-plane-boom.gif",
    boomTime: 100,
    hp: 1
}

var enemyPlaneS = {
    width: 34,
    height: 24,
    imgSrc: "images/enemy-plane-s.png",
    boomSrc: "images/enemy-plane-s-boom.gif",
    boomTime: 100,
    hp: 1
}

var enemyPlaneM = {
    width: 46,
    height: 60,
    imgSrc: "images/enemy-plane-m.png",
    hitSrc: "images/enemy-plane-m-hit.png",
    boomSrc: "images/enemy-plane-m-boom.gif",
    boomTime: 100,
    hp: 3
}

var enemyPlaneL = {
    width: 110,
    height: 164,
    imgSrc: "images/enemy-plane-l.png",
    hitSrc: "images/enemy-plane-l-hit.png",
    boomSrc: "images/enemy-plane-l-boom.gif",
    boomTime: 100,
    hp: 7
}

var bullet = {
    width: 6,
    height: 14,
    imgSrc: "images/our-bullet.png",
    speed: 20
}

Plane.prototype.draw = function() {
    this.imgNode = new Image();
    this.imgNode.src = this.imgSrc;
    this.imgNode.style.top = this.currentY + 'px';
    this.imgNode.style.left = this.currentX + 'px';
    mainDiv.appendChild(this.imgNode);
}

Plane.prototype.move = function() {
    this.currentY += this.speed;
    this.centerY = this.currentY + this.sizeY/2;
    this.imgNode.style.top = this.currentY + 'px';
    this.checkOverRange();
}

Plane.prototype.checkOverRange = function () {
    this.overTop = this.centerY < 0;
    this.overBottom = this.centerY > stageSizeY;
}

var Enemy = function() {
    this.segments = [];
    this.counter = 0;
}

var randomNumber = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

Enemy.prototype.create = function() {
    this.counter ++;
    if (this.counter%14 == 0) {
        //生成大飞机
        this.newEnemy = new Plane(randomNumber(enemyPlaneL.width/2, stageSizeX-enemyPlaneL.width/2), 0, enemyPlaneL, 1);
    } else if (this.counter%7 == 0) {
        //生成中飞机
        this.newEnemy = new Plane(randomNumber(enemyPlaneM.width/2, stageSizeX-enemyPlaneM.width/2), 0, enemyPlaneM, randomNumber(2,3)); 
    } else {
        //生成小飞机
        this.newEnemy = new Plane(randomNumber(enemyPlaneS.width/2, stageSizeX-enemyPlaneS.width/2), 0, enemyPlaneS, randomNumber(3,5));
    }

    this.segments.push(this.newEnemy);
    this.newEnemy.draw();
}

Enemy.prototype.moveAll = function() {
    for (i = 0; i < this.segments.length; i++) {
        this.segments[i].move();
        if (this.segments[i].overBottom) {
            mainDiv.removeChild(this.segments[i].imgNode);
            this.segments.splice(i, 1);
        }

        for (k = 0; k < ourPlaneA.segments.length; k++) {
            var XPengzhuang = Math.abs(this.segments[i].centerX - ourPlaneA.segments[k].centerX) < Math.abs(this.segments[i].sizeX/2 - ourPlaneA.segments[k].sizeX/2);
            var YPengzhuang = Math.abs(this.segments[i].centerY - ourPlaneA.segments[k].centerY) < Math.abs(this.segments[i].sizeY/2 - ourPlaneA.segments[k].sizeY/2);
            var bulletPengzhuang = XPengzhuang && YPengzhuang;

            if (bulletPengzhuang) {
                score ++;
                scoreDiv.innerHTML = score;
                if(this.segments[i].hp > 0) {
                    this.segments[i].hp --;
                    this.segments[i].imgNode.src = this.segments[i].hitSrc? this.segments[i].hitSrc : this.segments[i].boomSrc;

                    //删除子弹
                    mainDiv.removeChild(ourPlaneA.segments[k].imgNode);
                    ourPlaneA.segments.splice(k,1);
                }
            }
        }

        var planeXPengzhuang = Math.abs(this.segments[i].centerX - ourPlaneA.centerX) < Math.abs(this.segments[i].sizeX/2 - ourPlaneA.sizeX/2);
        var planeYPengzhuang = Math.abs(this.segments[i].centerY - ourPlaneA.centerY) < Math.abs(this.segments[i].sizeY/2 - ourPlaneA.sizeY/2);
        var planePengzhuang = planeXPengzhuang && planeYPengzhuang;

        if (planePengzhuang) {
            this.segments[i].hp = 0;
            ourPlaneA.hp --;
        }

        if (this.segments[i].hp <= 0) {
            this.segments[i].imgNode.src = this.segments[i].boomSrc;
            this.segments[i].boomTime -= 10;
            if (this.segments[i].boomTime <= 0) {
                mainDiv.removeChild(this.segments[i].imgNode);
                this.segments.splice(i, 1);
            }
        }
    }
}

var enemies = new Enemy();

var ourPlaneA = new Plane(stageSizeX/2, stageSizeY-ourPlane.height/2, ourPlane, 0);
ourPlaneA.draw();

mainDiv.onmousemove = function(ev) {
    ourPlaneA.centerX = ev.clientX - stageDiv.offsetLeft;
    if (ourPlaneA.centerX < 0) {
        ourPlaneA.centerX = 0;
    }
    if (ourPlaneA.centerX > stageSizeX) {
        ourPlaneA.centerX = stageSizeX;
    }
    // ourPlaneA.centerX = ev.clientX - mainDiv.offsetLeft;

    ourPlaneA.centerY = ev.clientY;
    if (ourPlaneA.centerY < 0) {
        ourPlaneA.centerY = 0;
    }
    if (ourPlaneA.centerY > stageSizeY) {
        ourPlaneA.centerY = stageSizeY;
    }

    // console.log('clientY' + ev.clientY);
    // console.log('centerY' + ourPlaneA.centerY);
    ourPlaneA.currentX = ourPlaneA.centerX - ourPlaneA.sizeX/2;
    ourPlaneA.currentY = ourPlaneA.centerY - ourPlaneA.sizeY/2;
    ourPlaneA.imgNode.style.left = ourPlaneA.currentX + 'px';
    ourPlaneA.imgNode.style.top = ourPlaneA.currentY + 'px';
}

ourPlaneA.segments = []; //保存子弹的数组

var Bullet = Plane;

var newBulletCreate = function() {
    ourPlaneA.newBullet = new Bullet(ourPlaneA.centerX, ourPlaneA.currentY, bullet, -20);
    ourPlaneA.segments.push(ourPlaneA.newBullet);
    ourPlaneA.newBullet.draw();
}

//子弹移动 与敌机移动相仿 但方向相反
var newBulletMove = function() {
    for (j = 0; j < ourPlaneA.segments.length; j++) {
        ourPlaneA.segments[j].move();
        if (ourPlaneA.segments[j].overTop) {
            mainDiv.removeChild(ourPlaneA.segments[j].imgNode);
            ourPlaneA.segments.splice(j, 1);
        }
    }
}

var time = 0;
var timeSet;

// 设置cookie的函数
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays *24 *60 *60 *1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

// 寻找cookie的函数
function findCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(cname) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// 初始化 如果没有最高分数 也没有cookie 则存放在本地存储
if (findCookie('highscore') == "" || findCookie('highscore') == null) {
    // setCookie('highscore', 0, 3);
    if (!localStorage.highscore) {
        localStorage.highscore = 0;
    }
}

document.querySelector('.createcookie').onclick = function () {
    setCookie('highscore', 0, 3);
}

function gameOver() {
    ourPlaneA.imgNode.src = ourPlaneA.boomSrc;
    clearInterval(timeSet);
    document.querySelector('div#final-score').innerHTML = score;
    settlementDiv.style.display = 'block';

    // 判断游戏分数并更新
    // 找寻最高分数是否在cookie 没有则找localstorage
    var highscore = findCookie('highscore')? findCookie('highscore'): localStorage.highscore;
    if (score > highscore) {
        if (findCookie('highscore') != "" && findCookie('highscore') != null) {
            setCookie('highscore', score, 7);
        } else {
            localStorage.highscore = score;
        }
        alert('你获得了历史最高分数:' + score);
    }
}

var start = function () {
    startDiv.style.display = 'none';
    mainDiv.style.display = 'block';
    menuDiv.style.display = 'none';
    settlementDiv.style.display = 'none';

    timeSet = setInterval(function () {
        time ++;
        if (time %50 == 0) {
            enemies.create();
        }
        enemies.moveAll();

        if (time %10 == 0) {
            newBulletCreate();
        }
        newBulletMove();

        if (ourPlaneA.hp <= 0) {
            gameOver();
        }
    },25);
}

// 暂停界面
mainDiv.onclick = function () {
    clearTimeout(timeSet);
    menuDiv.style.display = 'block';
}

// 继续游戏
continueDiv.onclick = function (ev) {
    ev.stopPropagation();
    start();
}

//重新开始
function restart() {
    window.location.reload();
}