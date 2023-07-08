import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let startButton = document.getElementById("start")
var menu = document.getElementById("menu")
var newDiv = document.createElement('div');

let lastTime 
function update(time){
const playerScoreElem = document.getElementById("player-score")
    if(lastTime!=null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        
        if(isLose()) {handleLose(hue)}
    }

    lastTime =time
    if(parseInt(playerScoreElem.textContent)<5 && parseInt(computerScoreElem.textContent)<5)
    window.requestAnimationFrame(update)
    else if(parseInt(playerScoreElem.textContent)>=5){
        console.log("Player has won")
        menu.appendChild(newDiv)
        newDiv.innerHTML = 'Player has won';
        menu.style.display = "block";

    }
    else{
        console.log("CPU has won")
        menu.appendChild(newDiv)
        newDiv.innerHTML = 'CPU has won!';
        menu.style.display = 'block';
    }
}

function isLose(){
    const rect = ball.rect()
    return (rect.right>= window.innerWidth || rect.left <=0)
}

function handleLose(hue){
    console.log('Someone has lose')
    const rect = ball.rect()
    if(rect.right >= window.innerHeight){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
        document.documentElement.style.setProperty("--hue", hue + 10)
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
        document.documentElement.style.setProperty("--hue", hue -  5)
    }
     ball.reset()
     computerPaddle.reset()
}

document.addEventListener("mousemove", e=>{
    playerPaddle.position = (e.y / window.innerHeight )*100
})
// window.requestAnimationFrame(update)
startButton.addEventListener("click", function() {
    startGame(startButton);
});

function startGame() {
    console.log("The button is working");
    menu.style.display = "none";
    playerScoreElem.textContent = 0
    computerScoreElem.textContent = 0
    if(newDiv.textContent != null)
    {newDiv.textContent == null}

    window.requestAnimationFrame(update);
}