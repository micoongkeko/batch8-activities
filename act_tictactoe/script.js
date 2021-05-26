//////////////////// DISPLAY GAME STATUS ////////////////////
const statusDisplay = document.querySelector('.game--status');

/*
create an object called gameStateObject
include key value pairs of player and data-cell-index
on the player, have a function that adds the player of the previous click
on the data-cell-index, have a function that adds the index # of previously clicked cell

*/

//////////////////// DECLARE UNIVERSAL VARIABLES ////////////////////
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let historyState = [];
let previousMoves = [];
let nextMoves = [];
let previousPlayer = [];
let nextPlayerArr = [];

//////////////////// DECLARE MESSAGES ////////////////////
// message functions include variable previously declared
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// displays current player
statusDisplay.innerHTML = currentPlayerTurn();

//////////////////// WINNING CONDITIONS FOR ARRAY ////////////////////
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//////////////////// ASSIGN X OR O TO CLICKED CELL ////////////////////
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    // historyState.push(clickedCellIndex);
    // console.log(historyState);
}

//////////////////// CHANGE CURRENT PLAYER BASED ON CLICKED CELL ////////////////////
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//////////////////// ASSIGN X OR O TO CLICKED CELL ////////////////////
function handleResultValidation() {
    let roundWon = false;
// check for winning condition every cell click (every move)
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
// if game state array has no empty cell and winning conditions are not met, draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
// player change is called after every move
    handlePlayerChange();
    

    console.log(gameState);

    
let prevMoveObject = {
    playersHistory: previousPlayer[previousPlayer.length-1],
    dataCellHistory: previousMoves[previousMoves.length-1],
    moveSummary: function() {return `${this.playersHistory} placed a marker on cell ${this.dataCellHistory}`},

    
}
console.log(prevMoveObject.playersHistory);
console.log(prevMoveObject.dataCellHistory);
console.log(prevMoveObject.moveSummary());
}

//////////////////// HANDLE CELL CLICK ////////////////////
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    historyState.push(clickedCellIndex);
    // console.log(historyState);
    previousPlayer.push(currentPlayer);
    previousMoves.push(clickedCellIndex);
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    
 
    
    console.log(previousMoves);
    console.log(previousPlayer);
}

//////////////////// RESTART GAME BUTTON ////////////////////
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    historyState = [];
    previousMoves = [];
    nextMoves = [];
    previousPlayer = [];
    nextPlayerArr = [];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    // document.getElementsByClassName('.previous').style.display = "none";
    // document.getElementsByClassName('.next').style.display = 'none';
    
}


const previousMoveBtn = document.querySelector('.previous');
const nextMoveBtn = document.querySelector('.next');


function previousMove() {
    let lastMove = previousMoves[previousMoves.length - 1];

    previousMoves.splice(-1,1);

    lastPlayer = previousPlayer[previousPlayer.length - 1];

    console.log(`[${lastMove}, ${lastPlayer}]`);

    nextPlayerArr.push(lastPlayer);

    // document.getElementsByClassName(`${lastMove}`).textContent = "";

    nextMoves.push(lastMove);

    previousPlayer.splice(-1,1);

    // previousMoves.push(historyState.splice(historyState.length-1));

    // console.log(historyState);
    // console.log(previousMoves);
}

function nextMove() {
let ffMove = nextMoves[nextMoves.length - 1];

previousMoves.push(ffMove);

lastPlayer = nextPlayerArr[nextPlayerArr.length - 1];

previousPlayer.push(lastPlayer);

console.log(`[${ffMove}, ${lastPlayer}]`);

nextMoves.splice(-1,1);

// document.getElementsByClassName(`${ffMove}`).textContent = lastPlayer;

nextPlayerArr.splice(-1,1);



    // var i;
    // for (i = 0; i <= historyState.length; i++) {
    //     nextMoves.push(historyState[i]);
    // }
    // nextMoves.push
    // console.log(historyState);
    // console.log(nextMoves);
}
// function showmoves() {
//     if (statusDisplay == `It's ${currentPlayer}'s turn`) {
//         document.getElementsByClassName('.previous').style.display = 'none';
//         document.getElementsByClassName('.next').style.display = 'none';
//     }
//     // else {
//     //     document.getElementsByClassName('.previous').style.display = 'inline';
//     //     document.getElementsByClassName('.next').style.display = 'inline';
//     // }
    
// }


// Added Event Listeners to game cells
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// Added Event Listeners to Restart button
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);


// document.querySelector('.previous').addEventListener('click',previous());
// document.querySelector('.next').addEventListener('click',next());
// need to add previous and next buttons 

// if (statusDisplay === `It's ${currentPlayer}'s turn`) {
//     document.getElementsByClassName('.previous').style.display = 'none';
//     document.getElementsByClassName('.next').style.display = 'none';
// }

// function previous() {
//     if (roundWon = false) {
//         return gameState[i-1]
//     }
// }


// function next() {
//     if (roundWon = false) {
//         return gameState[i+1]
//     }
// }
