let gameBoard = document.getElementById("game");
let controls = document.getElementById("controls");
controls.style.gridTemplateColumns =  "240px"; 

let winnerMessage = document.querySelector(".winner-message")
console.log(winnerMessage)


let buttons = document.getElementsByClassName('buttons');
console.log(buttons);
function disableAllButtons(){
    for(let button of buttons){
        button.disabled = true;
    }
}
disableAllButtons();

let exitButton = document.querySelector("#exit");
exitButton.style.display = "none";
exitButton.addEventListener("click",function(){
    gameBoard.style.display = "none";
    exitButton.style.display = "none";
    startButton.style.display = "grid";
    resetButton.style.display = "none";
    winnerMessage.style.display = "none";
    controls.style.gridTemplateColumns =  "240px"; 
    resetGame();
});

let startButton = document.querySelector("#start");
console.log(startButton);
startButton.addEventListener("click",startGame);

let resetButton = document.querySelector("#reset");
console.log(resetButton);
resetButton.addEventListener("click",resetGame);
resetButton.style.display = "none";


let turnO = true;

let winner = "null";


let winnerSequence = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];

function checkWinner(){
    for(let seq of winnerSequence){
        if(buttons[seq[0]].innerHTML !== "" && buttons[seq[1]].innerHTML !== "" && buttons[seq[2]].innerHTML !== ""){
            if(buttons[seq[0]].innerHTML === buttons[seq[1]].innerHTML  &&  buttons[seq[1]].innerHTML === buttons[seq[2]].innerHTML){
                return true;
            }
        }
        
    }
    return false;

}

function markBox(event) {
    let button = event.target;
    if (turnO) {
        button.innerHTML = 'O';
    } else {
        button.innerHTML = 'X';
    }
    turnO = !turnO;
    button.disabled = true;
    if(drawChecker()){
        
        disableAllButtons();
    }
    if (checkWinner()) {
        winner = turnO ? "X" : "O";
        displayWinnerMessage(winner);
        disableAllButtons();
        
    }
}

function startGame(){
    gameBoard.style.display = "grid";
    for(let button of buttons){
        button.disabled  = false;
        button.innerHTML = "";
        button.addEventListener('click',markBox); resetGame();
    }
    startButton.style.display = "none";
    resetButton.style.display = "grid";
    exitButton.style.display = "grid";
    controls.style.gridTemplateColumns = "240px 240px";

}

function resetGame(){
    for(let button of buttons){
        button.innerHTML = "";
        button.disabled = false;
    }
    winnerMessage.innerHTML = "";
    winnerMessage.style.display = "none";
}

function displayWinnerMessage(winner){
    winnerMessage.style.display = "grid";
    winnerMessage.innerHTML = "";
    let message = document.createElement("h1");
    message.style.height = "60px";
    message.textContent = "Winner is player " + winner;
    winnerMessage.appendChild(message);
    let scrollMessage = document.createElement("p");
    scrollMessage.textContent = "Scroll down to view the board. "
    winnerMessage.appendChild(scrollMessage);
}

function drawChecker(){
    for(let button of buttons){
        if(button.innerHTML === ""){
            return false;
        }
    }
    winnerMessage.style.display = "grid";
    winnerMessage.innerHTML = "";
    let message = document.createElement("h1");
    message.style.height = "60px";
    message.textContent = "Game is a draw";
    winnerMessage.appendChild(message);
    let scrollMessage = document.createElement("p");
    scrollMessage.textContent = "Scroll down to view the board. "
    winnerMessage.appendChild(scrollMessage);
   
    return true;
}