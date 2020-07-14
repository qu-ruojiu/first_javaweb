function Snake (x, y)
{
    this.x = x;
    this.y = y;

    Snake.prototype.getHTML = function() {  //获得对应按钮在HTML中的节点
        return document.getElementById("area").getElementsByTagName("div")[this.y].getElementsByTagName("input")[this.x];
    }
}

function GameArea (x, y, isBody, isFood, isHead)
{
    this.x = x;
    this.y = y;
    this.isBody = isBody;
    this.isFood = isFood;
    this.isHead = isHead;

    GameArea.prototype.getHTML = function() {  //获得对应按钮在HTML中的节点
        return document.getElementById("area").getElementsByTagName("div")[this.y].getElementsByTagName("input")[this.x];
    }
}

var snake;
var gameArea;
var x = 22;  //列数
var y = 22;  //行数
var areaColor = "rgb(198, 215, 185)";  //区域颜色
var snakeColor = "rgb(85, 177, 207)";  //蛇身颜色
var headColor = "rgb(65, 126, 199)";  //蛇头颜色
var foodColor = "rgb(240, 108, 79)";  //食物颜色

var scores;
var grade;
var speed;
var dir;  //蛇运动方向
var snakeLength;  //蛇身长度
var ifGrowing;  //上一次是否长了身体
var setIntervalReturn;  //记录setInterval的返回值

function init()  //按开始键初始化数据
{
    scores = 0;
    document.getElementById("scores").value = 0;
    grade = 1;
    document.getElementById("grade").value = 1;
    speed = 250;
    topSpeedMode = false;
    snakeLength = 1;
    ifGrowing = false;
    dir = [1, 0];  //一开始向右
    oldKeyCode = 39;  //一开始向右
    pressWating = true;  //用于防止方向键被快速按多次
    clearInterval(setIntervalReturn);  //防止多次重按start造成多个setInterval同时进行
}

function originalBodyAndFood()  //先造出3个长度和食物
{
    snake = new Array();

    snake[0] = new Snake(3, Math.floor(y/2)+2);
    snake[0].getHTML().style.backgroundColor = headColor;
    gameArea[snake[0].y][snake[0].x].isHead = true;

    gameArea[Math.floor(y/2-1)][Math.floor(x/2)].isFood = true;
    gameArea[Math.floor(y/2-1)][Math.floor(x/2)].getHTML().style.backgroundColor = foodColor;

    for (var i=1; i<3; i++)
        setTimeout("growing()", speed*i);
}