function drawTiles() {
    // Get a reference to the container element for the tiles
    var gridContainer = document.getElementById('grid-container');

    // Generate and append the tiles to the container
    for (var row = 0; row < 10; row++) {
        for (var col = 0; col < 10; col++) {
            var tile = document.createElement('div');
            tile.classList.add('tile');

            // Calculate the HSL values for the tile based on its position
            var hue = 260 - (row * 10) + (col*10);
            var saturation = 250 - (col * 10);
            var lightness = 30 + (row * 5) + (col * 2);

            // Set the background color of the tile
            tile.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

            // Append the tile to the container
            gridContainer.appendChild(tile);
        }
    }
}


window.onload = function() {
	drawTiles();
};

