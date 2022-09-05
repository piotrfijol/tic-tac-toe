import Player from "./Player";

function AIPlayer(marker, difficulty) {
    let ob = Object.create(Player(marker));
    ob.difficulty = difficulty;

    return ob;
}

let EASY = Symbol('easy');
let UNBEATABLE = Symbol('unbeatable');

export {
    AIPlayer,
    EASY,
    UNBEATABLE,
}