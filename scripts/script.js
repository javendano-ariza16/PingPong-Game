import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let startButton = document.getElementById("start")

let lastTime 
function update(time){
    if(lastTime!=null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        
        if(isLose()) {handleLose(hue, delta)}
    }

    lastTime =time
    if(parseInt(playerScoreElem.textContent)<5 && parseInt(computerScoreElem.textContent)<5)
    window.requestAnimationFrame(update)
    else if(parseInt(playerScoreElem.textContent)>=5){
        console.log("Player has won")
    }
    else{console.log("CPU has won")}
}

function isLose(){
    const rect = ball.rect()
    return (rect.right>= window.innerWidth || rect.left <=0)
}

function handleLose(hue, delta){
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
    startButton.disabled = true; // Disable the button once clicked
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    window.requestAnimationFrame(update);
}