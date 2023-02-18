function generateRandomColor() {
	// Generate a random hue between 0 and 360 degrees
	let hue = Math.floor(Math.random() * 360);

	// Generate a random saturation and lightness between 50% and 80%
	let saturation = Math.floor(Math.random() * 30) + 50;
	let lightness = Math.floor(Math.random() * 30) + 50;

	// Return the color in HSL format
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
