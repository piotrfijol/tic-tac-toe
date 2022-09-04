import Gameboard from '../src/Gameboard.js';

describe("Test Gameboard factory function", () => {
    test("Create a 3x3 grid", () => {
        let gameBoard = new Gameboard(3);
        expect(gameBoard.getGridSize()).toBe(3);
    });

    test("Grid is empty", () => {
        let gameBoard = new Gameboard(3);
        expect(gameBoard.getGrid().every(tile => tile === ''));
    });

    test("Set 'x' marker at 2nd row, 1st col", () => {
        let gameBoard = new Gameboard(3);
        gameBoard.setMarkerAtPosition(0, 1, 'x')
        expect(gameBoard.getGrid()[1][0]).toBe('x');
    });
});