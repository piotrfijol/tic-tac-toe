import Player from './Player.js';

let players = [];

function startGame() {
    let markers = ['x',' o'];  
    let playerMarker = Math.floor(Math.random() * 2);   

    let playerOne = new Player(markers[playerMarker]);

    // Assign to the computer the marker that is still free
    let computer  = new Player(markers[(playerMarker + 1) % markers.length]);    
    players.push(playerOne, computer);
    
}

function findWinner() {

}



export {
    startGame,
    findWinner,
}