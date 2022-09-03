import * as Game from './game.js';

Game.startGame();
Game.getPlayers().forEach(player => console.log(player.getMarker()));
