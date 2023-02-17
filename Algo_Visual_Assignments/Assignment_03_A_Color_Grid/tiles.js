function generateRandomColor() {
	// This function generates a random hex color code
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function drawTiles() {
	var gridContainer = document.getElementById('grid-container');
	for (var i = 0; i < 100; i++) {
		var tile = document.createElement('div');
		tile.classList.add('tile');
		tile.style.backgroundColor = generateRandomColor();
		gridContainer.appendChild(tile);
	}
}

window.onload = function() {
	drawTiles();
};
