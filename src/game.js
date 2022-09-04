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

        let scenario = checkScenario(x, y, marker);

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

function AIMakeDecision() {
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

}

function checkScenario(x, y, marker) {
    let state = _gameboard.getGrid();

    // Check rows;
    if(!state[y].some(field => field !== marker)) {
        return 2;
    }

    //Check cols;
    if(!state.some(row => row[x] !== marker)) {
        return 2;
    }

    //Check diagonals
    if(x === y  && !state.some((row, index) => row[index] !== marker)) {
        return 2;
    } else if(x === 2-y && !state.some((row, index) => row[2-index] !== marker)) {
        return 2;
    } 

    if(getRound() === _gameboard.getGridSize() ** 2) return 1;

    return 0;
}

function startGame() {
    let markers = ['x',' o'];  
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