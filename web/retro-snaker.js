
var name;
window.onload = function() {
    show();
}

function start()
{
    /*为游戏区域建立对应对象*/
    gameArea = new Array();
    for (var i=0; i<y; i++)
    {
        gameArea[i] = new Array();
        for (var j=0; j<x; j++)
            gameArea[i][j] = new GameArea(j, i, false, false, false);
    }

    show();
    document.getElementById("scoreboard").style.display = "inherit";
    init();
    originalBodyAndFood();

    setIntervalReturn = setInterval("moveOn()", speed);  //持续运动！
}

function moveOn()
{
    if (gameArea[snake[0].y][snake[0].x].isFood)
    {
        eating();
        bodyMoveOn();
    }
    else if (gameArea[snake[0].y][snake[0].x].isBody)
        gameOver();
    else if (snake[0].x+dir[0]<0 || snake[0].x+dir[0]>=x || snake[0].y+dir[1]<0 || snake[0].y+dir[1]>=y)
        gameOver();
    else
        bodyMoveOn();
}

function eating()  //吃到食物
{
    gameArea[snake[0].y][snake[0].x].isFood = false;
    gameArea[snake[0].y][snake[0].x].getHTML().value = " ";
    upGrade();
    growing();
    resetSpeed();
    creatFood();
    if ((!topSpeedMode && scores==33) || (topSpeedMode && scores==20))  //满级后每次两个食物出现
        creatFood();
}

function resetSpeed()  //重调速度并重新设置运动行为
{
    clearInterval(setIntervalReturn);
    if (topSpeedMode)
        speed = 80;
    else if (speed > 200)
        speed = 250 - (grade-1)*30;
    else if (speed > 100)
        speed = 190 - (grade-3)*18;
    else if (speed > 80)
        speed = 100 - (grade-8)*5;
    else
        speed = 80;
    setIntervalReturn = setInterval("moveOn()", speed);
}

function growing()  //长大
{
    snake[snakeLength] = new Snake(snake[snakeLength-1].x, snake[snakeLength-1].y);
    snake[snakeLength].getHTML().style.backgroundColor = snakeColor;
    snakeLength++;
    ifGrowing = true;  //就不可减去尾巴
}

