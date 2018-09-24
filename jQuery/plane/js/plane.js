var stageDiv = document.getElementById("stage");
var startDiv = document.getElementById("start");
var mainDiv = document.getElementById("main");
var scoreDiv = document.getElementById("score");
var menuDiv = document.getElementById("menu");
var continueDiv = document.getElementById("continue");
var restartDiv = document.getElementById("restart");
var settlementDiv = document.getElementById("settlement");

var score = 0;

//获取游戏窗口宽高
var stageStyle = stageDiv.currentStyle ? stageDiv.currentStyle : window.getComputedStyle(stageDiv, null);
var stageSizeX = parseInt(stageStyle.width);
var stageSizeY = parseInt(stageStyle.height);

//创建飞机和子弹对象
var bullets = {
    width : 6,
    height : 14,
    imgSrc : "./images/our-bullet.png",
    speed : 20
};

var enemyPlaneS = {
    width : 34,
    height : 24,
    imgSrc : "./images/enemy-plane-s.png",
    boomSrc : "./images/enemy-plane-s-boom.gif",
    boomTime : 100,
    hp : 1
};

var enemyPlaneM = {
    width : 46,
    height : 60,
    imgSrc : "./images/enemy-plane-m.png",
    hitSrc : "./images/enemy-plane-m-hit.png",
    boomSrc : "./images/enemy-plane-m-boom.gif",
    boomTime : 100,
    hp : 3
}

var enemyPlaneL = {
    width : 110,
    height : 164,
    imgSrc : "./images/enemy-plane-l.png",
    hitSrc : "./images/enemy-plane-l-hit.png",
    boomSrc : "./images/enemy-plane-l-boom.gif",
    boomTime : 100,
    hp : 5
}

var ourPlaneX = {
    width : 66,
    height : 80,
    imgSrc : "./images/our-plane.png",
    boomSrc : "./images/our-plane-boom.gif",
    boomTime : 100,
    hp : 1
}

//飞机的构造函数
var Plane = function (centerX, centerY, planeModel, speed) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.sizeX = planeModel.width;
    this.sizeY = planeModel.height;
    this.imgSrc = planeModel.imgSrc;
    this.boomSrc = planeModel.boomSrc;
    this.boomTime = planeModel.boomTime;
    this.hp = planeModel.hp;
    this.speed = speed;

    //定位点 即左上角
    this.currentX = this.centerX - this.sizeX/2;
    this.currentY = this.centerY - this.sizeY/2;
}

Plane.prototype.draw = function () {
    this.imgNode = new Image(); //创建新的image对象 即创建新的<img>标签
    this.imgNode.src = this.imgSrc;
    this.imgNode.style.top = this.currentY + 'px';
    this.imgNode.style.left = this.currentX + 'px';
    mainDiv.appendChild(this.imgNode);
}

Plane.prototype.move = function () {
    this.currentY += speed; //匀速从上到下前进
    this.centerY = this.currentY + this.sizeY/2;
    this.imgNode.style.top = this.currentY + 'px';
    this.checkOverRange();
}
Plane.prototype.checkOverRange = function () {
    this.isBottomRange = this.currentY > (stageSizeY - this.sizeY);
    this.isTopRange = this.currentY < 0;
}

