export default function Gameboard(gameboardSize) {
    
    let _gridSize = gameboardSize;
    let _grid = [];
    
    const initGrid = () => {
        for(let i=0; i<3; i++) {
            let row = [];
            for(let j=0; j<3; j++) {
                row.push('');
            }
            _grid.push(row);
        }
    }

    const getGridSize = () => {
        return _gridSize;
    }

    const getGrid = () => {
        return _grid.slice();
    }


    const setMarkerAtPosition = (x, y, marker) => {
        if(_grid[y][x] === '') {
            _grid[y][x] = marker; 
            return true;
        }
        return false;
    }

    initGrid();

    let ob = {
        getGridSize,
        getGrid,
        setMarkerAtPosition
    }

    return ob;
}