const renderBoard = (state, onClickListener) => {
    let wrapper = document.querySelector('.container');
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid');

    state.forEach((row, rowID) => {
        row.forEach((tile, colID) => {
            let tileEl =document.createElement('div');
            tileEl.dataset.position = rowID * row.length + colID; 
            tileEl.classList.add('tile');
            if(onClickListener && typeof onClickListener === 'function') {
                tileEl.addEventListener('click', onClickListener);
            }
            
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