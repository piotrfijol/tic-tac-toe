import Player from './Player.js';
import Gameboard from './Gameboard.js';
import * as displayController from './displayController.js';


let _players = [];
let _gameboard;
let _round = 0;

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

function makeMove(x, y, marker) {
    let playerMoved = _gameboard.setMarkerAtPosition(x, y, marker);
    if(!playerMoved) {
        console.error("Cant overwrite other player's marker");
    } else {
        let scenario = checkScenario(x, y, marker);
        switch(scenario) {
            case 1:
                //Tie
                break;
            case 2:
                //Win
                break;
            default:
                newRound();
                displayController.renderBoard(_gameboard.getGrid(), ev => {
                    makeMove(
                        ev.currentTarget.dataset.position % 3, 
                        parseInt(ev.currentTarget.dataset.position / 3),
                        _players[0].getMarker())
                });
                break;
        }
        
    }
}

function checkScenario(x, y, marker) {}

function startGame() {
    let markers = ['x',' o'];  
    let playerMarker = Math.floor(Math.random() * 2);   

    let playerOne = new Player(markers[playerMarker]);

    // Assign to the AI player a marker that is still free
    let computer  = new Player(markers[(playerMarker + 1) % markers.length]);    
    _players.push(playerOne, computer);
    
    let gridSize = 3;
    _gameboard = initGameboard(gridSize);
}



export {
    startGame,
}