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

function show()  //显示游戏区域
{
    var innerhtml = "";
    for (var i=0; i<y; i++)
    {
        innerhtml += "<div>";
        for (var j=0; j<x-1; j++)
        {
            innerhtml += "<input type='button' class='button0' value=' ' />";
        }
        innerhtml += "<input type='button' class='button0' value=' ' /></div>";
    }
    document.getElementById("area").innerHTML = innerhtml;
}

function creatFood()  //随机造食物
{
    var food_x, food_y;
    var needFood = true;  //需要造出一个食物

    while (needFood)
    {
        food_x = Math.floor(Math.random()*x);
        food_y = Math.floor(Math.random()*y);
        if (! (gameArea[food_y][food_x].isBody || gameArea[food_y][food_x].isHead || gameArea[food_y][food_x].isFood))  //此位置不是蛇
        {
            gameArea[food_y][food_x].isFood = true;
            gameArea[food_y][food_x].getHTML().style.backgroundColor = foodColor;
            needFood = false;
        }
    }
}

function bodyMoveOn()  //运动时身体的前进
{
    if (!ifGrowing)  //没长身体才能删掉尾巴
    {
        snake[snake.length-1].getHTML().style.backgroundColor = areaColor;
        gameArea[snake[snake.length-1].y][snake[snake.length-1].x].isBody = false;
    }
    else
        ifGrowing = false;

    for (var i=snake.length-1; i>0; i--)
    {
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

    /*原头部不再是头部，而是身体*/
    gameArea[snake[0].y][snake[0].x].isHead = false;
    gameArea[snake[0].y][snake[0].x].isBody = true;
    snake[0].getHTML().style.backgroundColor = snakeColor;

    snake[0].x += dir[0];
    snake[0].y += dir[1];
    gameArea[snake[0].y][snake[0].x].isHead = true;
    snake[0].getHTML().style.backgroundColor = headColor;
}


function upGrade()
{
    scores += 1;
    document.getElementById("scores").value = scores;

    grade = Math.floor(scores/3) + 1;
    document.getElementById("grade").value = grade;
    if (grade>=12 || topSpeedMode)  //12级满级
        document.getElementById("grade").value = "12!";
}

function gameOver()
{
    clearInterval(setIntervalReturn);
    alert("Game Over ! (*｀へ´*)");
}
