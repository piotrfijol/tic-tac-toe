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

const renderMessage = (text) => {
    let msg = document.createElement('p');
    msg.textContent = text;
    msg.classList.add('message');

    document.body.appendChild(msg);
}

const removeMessage = () => {
    document.querySelector('.message').remove();
}

const detachEvents = () => {
    document.querySelectorAll('.tile').forEach(tile => {
        let newTile = tile.cloneNode(true);
        tile.parentNode.replaceChild(newTile, tile)
    })
}

export {
    renderBoard,
    renderMessage,
    removeMessage,
    detachEvents
}