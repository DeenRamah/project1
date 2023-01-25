
import Ball from "./Ball"
import Paddle from "./Paddle"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


let lastTime
function update(time) {

if(lastTime != null){
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = perseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )

    document.documentElement.style.setProperty("--hue", hue + delta * .01)
    // this is to change the color of the game window as per time

    if(isLose()) handleLose()
}

lastTime = time
window.requestAnimationFrame(update)
}
function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth|| rect.left <=0
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = perseInt(playerScoreElem.textContent) +1
    } else{
        computerScoreElem.textContentc= perseInt(computerScoreElem.textContent) +1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e =>{
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)