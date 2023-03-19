// Apply the rule to given config
function applyRule(config, rule) {

    // Check if the input 'config' is an array containing only 0 or 1
    if(!Array.isArray(config) || !config.every(x => x === 0 || x === 1)) {
        throw new console.error("Invalid Input Configuration");
    }

    // Check if the input 'rule' is an integer in range (0,255)
    if (!Number.isInteger(rule) || rule < 0 || rule > 255) {
        throw new Error('Invalid Rule');
    }

    // New array updatedConfig of same size as config 
    const n = config.length;
    const updatedConfig = new Array(n);
    
    
    // Apply rule to each cell and its neighbors
    for (let i = 0; i < n; i++) {
        const left = config[(i+n-1) % n];
        const center = config[i];
        const right = config[(i+1) % n];
        const index = (left << 2) | (center << 1) | right;
        updatedConfig[i] = (rule >> index) & 1;
    }

    // Return updated configuration
    return updatedConfig;

}


// Grid and Tiles
const NUM_COLUMNS = 31;
const NUM_ROWS = 20;
const TILE_BORDER = 0.5;
const TILE_SIZE = 20;
const TILE_INNER = TILE_SIZE - 2 * TILE_BORDER; 	

const CONTAINER_WIDTH = NUM_COLUMNS * TILE_SIZE;
const CONTAINER_HEIGHT = NUM_ROWS * TILE_SIZE;


// Initial configuration => first row
let initialConfig = []
for(let i=0; i<NUM_COLUMNS; i++){
	if(i === 15){
		initialConfig.push(1);	
	} else{
		initialConfig.push(0);
	}
}


function getRule() {
	const rule = document.forms[0].rule.value;
	console.log(rule);
}


// Initial rule => 50
const initialRule = 50;

// All configuration
const allConfig = [];

for (let i = 0; i < NUM_ROWS; i++) {
	if(i === 0) {
		allConfig.push(initialConfig);
	}

	if(i > 0) {
		initialConfig = applyRule(initialConfig, initialRule);
		allConfig.push(initialConfig);
	}
}

// All tile div
const allTile = [];

// Draw Grid
function drawGrid() {
    // Make the container the right size
    const container = document.querySelector('#grid-background');
    container.style.width = CONTAINER_WIDTH + "px";
    container.style.height = CONTAINER_HEIGHT + "px";

    for (let i = 0; i < NUM_COLUMNS; i++) {
		for (let j = 0; j < NUM_ROWS; j++) {
			// Make a new div for a box
			let box = document.createElement('div');

			box.id = 'tile' + i + '-' + j;

			// Make box's class 'tile'
			box.classList.add('tile');

			// Compute coordinates for this box
			let x = i * TILE_SIZE;
			let y = j * TILE_SIZE;

			box.style.left = x + 'px';
			box.style.top = y + 'px';

			// Set the size of the box
			box.style.width = TILE_INNER + 'px';
			box.style.height = TILE_INNER + 'px';

			// Set the color of the box
			box.style.backgroundColor = "white";
			box.style.borderColor = "rgb(64, 64, 64)";

			
			// Make the box a child of container
			container.appendChild(box);

			allTile.push(box);
		}
    }
	updateTile(allTile, allConfig);
}


// Update the color of tile
function updateTile(tile, tileConfig){
	for (let i=0; i<NUM_COLUMNS; i++){
		let index = 0;
		index = index + (NUM_ROWS*i);	// Change the row for tile id
		
		// Change color of Tile to black
		tileConfig.forEach(element => {
			if (element[i] === 1) {
				tile[index].style.backgroundColor = "black";
			}
			index++;
		});
	}
}


module.exports = { applyRule };