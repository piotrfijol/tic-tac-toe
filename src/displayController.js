const renderBoard = (state) => {
    let wrapper = document.querySelector('.container');
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid');

    state.forEach(row => {
        row.forEach(tile => {
            let tileEl =document.createElement('div');
            tileEl.classList.add('tile');
            
            let marker = document.createElement('span');
            marker.classList.add('marker');
            marker.textContent = tile;

            tileEl.appendChild(marker);
            gridContainer.appendChild(tileEl);
        })
    })

    clearBoard(); 
    wrapper.appendChild(gridContainer);
}

const clearBoard = () => {
    let gridContainer = document.querySelector('.grid');
    
    if(gridContainer)
        gridContainer.remove();
}

export {
    renderBoard
}