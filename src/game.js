import Player from './Player.js';
import Gameboard from './Gameboard.js';
import * as displayController from './displayController.js';


let _players = [];
let _gameboard;
let _round = 0;

let gridSize = 3;

function getGameboard() {
    return _gameboard;
}

function newRound() {
    _round++;
}

function getRound() {
    return _round;
}

function initGameboard(gridSize) {
    let gameboard = new Gameboard(gridSize);
    displayController.renderBoard(gameboard.getGrid(), ev => {
        makeMove(
            ev.currentTarget.dataset.position % 3, 
            parseInt(ev.currentTarget.dataset.position / 3),
            _players[0].getMarker())
    });

    return gameboard;
}

function restartGame() {
    _gameboard = new Gameboard(gridSize);
    _round = 0;
}

function makeMove(x, y, marker) {
    let playerMoved = _gameboard.setMarkerAtPosition(x, y, marker);
    if(!playerMoved) {
        console.error("Cant overwrite other player's marker");
        return false;
    } else {
        newRound();
        displayController.renderBoard(_gameboard.getGrid(), ev => {
            makeMove(
                ev.currentTarget.dataset.position % 3, 
                parseInt(ev.currentTarget.dataset.position / 3),
                _players[0].getMarker())
        });

        let scenario = checkScenario(getRound(), _gameboard.getGrid());

        switch(scenario) {
            case 1:
                console.log("That's a tie");
                restartGame();
                break;
            case 2:
                console.log(marker + " is a winner!");
                restartGame();
                break;
        }
        
        //if Computer's move
        if(_round % 2 !== 0) {
            AIMakeDecision();
        }
    }

    return true;
}

function emptySpots(board) {
    let result = [];
    let x, y;
    for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
            if(board[i][j] === '') {
                x = j;
                y = i;
                result.push([x, y])
            }
        }
    }

    return result;;
}

function AIMakeDecision() {
    /*
    let decision = {
        x: Math.floor(Math.random() * _gameboard.getGridSize()),
        y: Math.floor(Math.random() * _gameboard.getGridSize())
    }
    
    while(!makeMove(decision.x, decision.y, _players[1].getMarker())) {
        decision = {
            x: Math.floor(Math.random() * _gameboard.getGridSize()),
            y: Math.floor(Math.random() * _gameboard.getGridSize())
        }
    }
    console.log(decision)
*/

    
    let decision = minimax(getRound(), _gameboard.getGrid(), true, 0);

    function minimax(round, board, isMax, depth) {
        let freeSpots = emptySpots(board);
        let marker = _players[round%2].getMarker();

        let moveResult = checkScenario(Math.max(0, round-1), board);
        // Look for termial nodes
        if(moveResult === 1) {
            return {value: 0};
        } else if (moveResult === 2) {
            return {value: isMax ? -50+depth : 0-depth};
        }

        if(isMax) {
            let val = {value: -Infinity};
            for(let freeSpot of freeSpots) {

                let boardCpy = JSON.parse(JSON.stringify(board));
                boardCpy[freeSpot[1]][freeSpot[0]] = marker;

                let nodeVal = minimax(
                    round + 1, 
                    boardCpy,
                    false,
                    depth+1
                    )
                
                if(nodeVal.value > val.value) {
                    val = nodeVal;
                    val.x = freeSpot[0];
                    val.y = freeSpot[1];
                }
            }
            return val;
        } else {
            let val = {value: Infinity};
            for(let freeSpot of freeSpots) {

                let boardCpy = JSON.parse(JSON.stringify(board));
                boardCpy[freeSpot[1]][freeSpot[0]] = marker;

                let nodeVal = minimax(
                    round + 1,
                    boardCpy,
                    true,
                    depth+1
                    )

                    if(nodeVal.value < val.value) {
                        val = nodeVal;
                    }
            }
            return val;
        }
    }

    makeMove(decision.x, decision.y, _players[0].getMarker())

    }

    function checkScenario(round, state) {
        let marker = _players[round%2].getMarker();

        // Check rows;
        if(state.some(row => row.every(field => field === marker))) {
            return 2;
        }

        //Check cols;
        if(state[0].some((col, colID) => state.every(row => row[colID] === marker))) {
            return 2;
        }

        //Check diagonals
        if(!state.some((row, index) => row[index] !== marker)) {
            return 2;
        } else if(!state.some((row, index) => row[2-index] !== marker)) {
            return 2;
        } 

        if((round+1) === (_gameboard.getGridSize() ** 2)) return 1;

        return 0;
    }

function startGame() {
    let markers = ['x','o'];  
    let playerMarker = Math.floor(Math.random() * 2);   

    let playerOne = new Player(markers[playerMarker]);

    // Assign to the AI player a marker that is still free
    let computer  = new Player(markers[(playerMarker + 1) % markers.length]);    
    _players.push(playerOne, computer);
    
    _gameboard = initGameboard(gridSize);
}



export {
    startGame,
}