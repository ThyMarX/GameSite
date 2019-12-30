//The validation part
function checkform(){
    let formElement = document.querySelector("#checkform");
    let systemMessage = document.querySelector("#systemMessage");
    let username = formElement.username;
    let password1 = formElement.password1;
    let password2 = formElement.password2;

    let samepasswords = false;
    let passlength = false;

    let yesCapital = false;
    let yesSmall = false;

    if (password1.value == password2.value){
        samepasswords = true;
    } else {
        systemMessage.innerHTML += "</br>Your passwords doesn't match";
    }

    if (password1.value.length > 3){
        passlength = true;
    } else {
        systemMessage.innerHTML += "</br>Your password is too short";
    }

    if (/[A-Z]/.test(password1)){
        yesCapital = true;
    } else {
        systemMessage.innerHTML += "</br>Your password needs at least 1 capital letter";
    }

    if (/[a-z]/.test(password1)){
        yesSmall = true;
    } else {
        systemMessage.innerHTML += "</br>Your password needs at least 1 lowercase letter";  
    }

    if (samepasswords && passlength && yesCapital && yesSmall){
        return true;
    } else {
        systemMessage.innerHTML += "</br>Something went wrong, sorry...";
        return false;
    }
}

function updateform(){

}

//The game canvas part
let canvas = document.querySelector("#canvas");
let create = document.querySelector("#create");
let reset = document.querySelector("#reset");

let dyingS = new Audio("sounds/dying.mp3");
let winningS = new Audio("sounds/winning.mp3");
let dohS = new Audio("sounds/doh.mp3");

let ctx = canvas.getContext('2d');

let score = document.querySelector("#score");

create.addEventListener("click", getLvl);
reset.addEventListener("click", resetMaze);

let mapCanvas;
let mapCanvas1 = [
    [3,1,1,1,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,1,0,0],
    [1,0,1,1,2]
]; 
let mapCanvas2 = [
    [1,1,1,4,1,1,1,1,1,0,1,1,1,1,4,1,1,1,1,1],
    [1,0,1,1,1,0,0,0,0,0,1,0,0,1,1,1,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,4,1,0,0,1,0,1,1,1,0,1,1,1],
    [1,0,1,0,1,1,1,0,1,1,1,1,0,0,0,1,0,0,0,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,5,1,1,0,1],
    [1,0,0,0,1,1,1,4,1,0,1,4,0,1,0,1,0,1,1,1],
    [1,1,1,0,1,0,1,1,1,0,1,1,0,1,0,1,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1],
    [1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,1], 
    [1,0,1,1,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,1],
    [1,0,1,0,0,0,1,0,1,1,1,1,0,1,0,1,0,0,0,0],
    [1,0,1,0,1,1,1,0,1,4,0,1,0,1,0,1,0,1,1,1],
    [1,0,1,0,1,3,1,0,1,1,0,1,1,1,0,1,0,1,4,1],
    [1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
    [1,1,1,4,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
let mapCanvasDeath = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,0,1,1,1,0,0,1,1,1,0,1,1,0,1,1],
    [1,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1],
    [1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,0,0,0],
    [0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1],
    [0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0,0,1],
    [0,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,0,1,1],
    [0,0,1,1,0,0,1,1,1,0,0,1,1,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
let mapCanvasWin = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,2,1,2,1,1,1,2,2,1,1,1,2,1,1,2,1,1],
    [1,1,1,2,1,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1],
    [1,1,1,1,2,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1],
    [1,1,1,1,2,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1],
    [1,1,1,1,2,1,1,1,1,2,2,1,1,1,1,2,2,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,2,1,1,1,2,1,1,2,2,2,1,1,2,1,1,2,1,1],
    [1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,2,1,2,1,1],
    [1,1,1,2,1,2,1,1,1,1,2,1,1,1,2,2,2,2,1,1],
    [1,1,1,2,1,2,1,1,1,1,2,1,1,1,2,1,2,2,1,1],
    [1,1,1,1,2,1,1,1,1,2,2,2,1,1,2,1,1,2,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]; 
let y;
let x;
let tileSize;
let playerPos;
let playerStartPos = {x,y};
let lvl;
let scoreCount = 1000;

function getLvl(){
    lvl = document.querySelector("#lvl").value;
    createMaze();
}

function createMaze() {
    if (lvl == 1){
        mapCanvas = mapCanvas1;
        tileSize = 100;
        playerStartPos = {x:0,y:0};
    } else if (lvl == 2){
        mapCanvas = mapCanvas2;
            tileSize = 25;
            playerStartPos = {x:5,y:13};
    } else {
        lvl = 1
        createMaze();
    }

    updateMaze();
}

function resetMaze(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,500,500);
    
    mapCanvas[playerPos.y][playerPos.x] = 1;
    mapCanvas[playerStartPos.y][playerStartPos.x] = 3;
    updateMaze();
}

function updateMaze(){
    for (y = 0; y < (mapCanvas).length; y++) {
        for (x = 0; x < mapCanvas[y].length; x++) {
            if (mapCanvas[y][x] == 0) {
                ctx.fillStyle = "red";
            } else if (mapCanvas[y][x] == 1){
                ctx.fillStyle = "lightblue";
            } else if (mapCanvas[y][x] == 2){
                ctx.fillStyle = "green";
            } else if (mapCanvas[y][x] == 5){
                ctx.fillStyle = "green";
            } else if (mapCanvas[y][x] == 3){
                ctx.fillStyle = "blue";
                playerPos = {x,y};
                console.log(playerPos);
            } else if (mapCanvas[y][x] == 4) {
                ctx.fillStyle = "purple";
            }
            ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
        }
    }
}

window.addEventListener("keydown", function(event){
    switch (event.keyCode){
        case 37: //left
            move(0,-1);
            updateScore();
            break;
        case 38: //up
            move(-1,0);
            updateScore();
            break;
        case 39: //right
            move(0,1);
            updateScore();
            break;
        case 40: //down
            move(1,0);
            updateScore();
            break;
    }
});

function move(y,x){
    if (mapCanvas[playerPos.y + y][playerPos.x + x] == 1){
        mapCanvas[playerPos.y + y][playerPos.x + x] = 3;
        mapCanvas[playerPos.y][playerPos.x] = 1;
        updateMaze();
    } else if (mapCanvas[playerPos.y + y][playerPos.x + x] == 2){
        resetMaze();
        lvl++;
        createMaze();
        winningS.play();
    } else if (mapCanvas[playerPos.y + y][playerPos.x + x] == 5){
        lvl = 1;
        mapCanvas = mapCanvasWin;
        resetMaze();
        winningS.play();
    } else if (mapCanvas[playerPos.y + y][playerPos.x + x] == 0){
        console.log("D'oh!");
        dohS.play();
    } else if (mapCanvas[playerPos.y + y][playerPos.x + x] == 4){
        mapCanvas = mapCanvasDeath;
        resetMaze();
        dyingS.play();
    }
}

function updateScore(){
    scoreCount--;
    score.innerHTML = scoreCount;
}