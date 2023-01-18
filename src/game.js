import Player from './Player';
import Gameboard from './Gameboard';
import * as displayController from './displayController';
import { AIPlayer, UNBEATABLE, EASY } from './AIPlayer';

let AI;

const _players = [];
let _gameboard;
let _round = 0;

const GRID_SIZE = 3;

function newRound() {
  _round += 1;
}

function getRound() {
  return _round;
}

function currentMarker() {
  return _players[getRound()%2].getMarker();
}

function checkScenario(round, state) {
  const marker = _players[round % 2].getMarker();

  // Check rows
  if (state.some((row) => row.every((field) => field === marker))) {
    return 2;
  }

  // Check cols
  if (state[0].some((col, colID) => state.every((row) => row[colID] === marker))) {
    return 2;
  }

  // Check diagonals
  if (!state.some((row, index) => row[index] !== marker)) {
    return 2;
  }
  if (!state.some((row, index) => row[2 - index] !== marker)) {
    return 2;
  }

  if ((round + 1) === (_gameboard.getGridSize() ** 2)) return 1;

  return 0;
}

function restartGame() {
  _gameboard = initGameboard(GRID_SIZE);
  displayController.removeMessage();
  _round = 0;
  AIMakeDecision();
}

function gameOver() {
  displayController.detachEvents();
  setTimeout(restartGame, 1000);
}

function makeMove(x, y, marker) {
  const playerMoved = _gameboard.setMarkerAtPosition(x, y, marker);
  if (!playerMoved) {
    if (marker !== AI.getMarker()) {
      console.error("Cant overwrite other player's marker");
    }
    return false;
  }

  renderBoard(_gameboard);
  const scenario = checkScenario(getRound(), _gameboard.getGrid());

  switch (scenario) {
    case 1:
      displayController.renderMessage("That's a TIE!");
      gameOver();
      break;
    case 2:
      displayController.renderMessage(marker === _players[1].getMarker() ? 'You won! Congratulations.' : 'AI won.. come on man');
      gameOver();
      break;
    default:
      break;
  }
  newRound();

  // If Computer's move
  if (currentMarker() === AI.getMarker()) {
    AIMakeDecision();
  }

  return true;
}

function renderBoard(gameboard) {
  displayController.renderBoard(gameboard.getGrid(), (ev) => {
    makeMove(
      ev.currentTarget.dataset.position % 3,
      parseInt(ev.currentTarget.dataset.position / 3),
      _players[1].getMarker()
    )
  });
}

function initGameboard(gridSize) {
  const gameboard = Gameboard(gridSize);
  renderBoard(gameboard);

  return gameboard;
}

function emptySpots(board) {
  let result = [];
  let x, y;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') {
        x = j;
        y = i;
        result.push([x, y]);
      }
    }
  }

  return result;
}

function randomChoice() {
  return {
    x: Math.floor(Math.random() * _gameboard.getGridSize()),
    y: Math.floor(Math.random() * _gameboard.getGridSize()),
  };
}

function AIMakeDecision() {
  let decision;
  if(AI.difficulty === EASY || getRound() === 0) {

    do {
      decision = randomChoice();
    } while (!makeMove(decision.x, decision.y, AI.getMarker()));

  } else if (AI.difficulty === UNBEATABLE) {
    decision = minimax(getRound(), _gameboard.getGrid(), -Infinity, Infinity, true, 0);
    makeMove(decision.x, decision.y, AI.getMarker());
  }

  function minimax(round, board, alpha, beta, isMax, depth) {
    const freeSpots = emptySpots(board);
    const marker = _players[round % 2].getMarker();
    const moveResult = checkScenario(Math.max(0, round - 1), board);

    // Look for termial nodes
    if (moveResult === 1) {
      return { value: 0 };
    } else if (moveResult === 2) {
      return { value: isMax ? -10 + depth : 10 - depth };
    }

    if (isMax) {
      let alphaVal = alpha;
      let val = { value: -Infinity };
      for (const freeSpot of freeSpots) {
        const boardCpy = JSON.parse(JSON.stringify(board));
        boardCpy[freeSpot[1]][freeSpot[0]] = marker;

        let nodeVal = minimax(
          round + 1,
          boardCpy,
          alphaVal,
          beta,
          false,
          depth + 1,
        );

        if (nodeVal.value > val.value) {
          val = nodeVal;
          alphaVal = nodeVal.value;
          [val.x, val.y] = [freeSpot[0], freeSpot[1]];
        }

        if(alpha >= beta) {
          return val;
        }
      }
      return val;
    } else {
      let betaVal = beta;
      let val = { value: Infinity };
      for (const freeSpot of freeSpots) {
        const boardCpy = JSON.parse(JSON.stringify(board));
        boardCpy[freeSpot[1]][freeSpot[0]] = marker;

        const nodeVal = minimax(
          round + 1,
          boardCpy,
          alpha,
          betaVal,
          true,
          depth + 1,
        );

        if (nodeVal.value < val.value) {
          val = nodeVal;
          betaVal = nodeVal.value;
        }

        if(beta <= alpha) {
          return val;
        }
      }
      return val;
    }
  }
}

function startGame() {
  const markers = ['x', 'o'];
  const playerMarker = Math.floor(Math.random() * 2);

  const playerOne = Player(markers[playerMarker]);

  // Assign to the AI player a marker that is still free
  AI = AIPlayer(markers[(playerMarker + 1) % markers.length], UNBEATABLE);
  _players.push(AI, playerOne);

  _gameboard = initGameboard(GRID_SIZE);
  AIMakeDecision();
}

export default {
  startGame,
};
