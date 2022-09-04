import Player from './Player.js';
import Gameboard from './Gameboard.js';

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

function initGameboard(gridSize) {
    let gameboard = new Gameboard(gridSize);
    displayController.renderBoard(gameboard.getState());

    return gameboard;
}



export {
    startGame,
}