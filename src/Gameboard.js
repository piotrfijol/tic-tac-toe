export default function Gameboard(gameboardSize) {
    
    let _gridSize = gameboardSize;
    let grid = [];
    
    const initGrid = () => {
        for(let i=0; i<3; i++) {
            let row = [];
            for(let j=0; j<3; j++) {
                row.push('');
            }
            grid.push(row);
        }
    }

    const getGridSize = () => {
        return _gridSize;
    }

    initGrid();

    let ob = {
        getGridSize,

    }
}