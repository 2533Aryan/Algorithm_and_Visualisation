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


// All configuration
const allConfig = [];

// Set rule given by user
let initialRule = getRule();


for (let i = 0; i < NUM_ROWS; i++) {
	if(i === 0) {
		allConfig.push(initialConfig);
	}

	if(i > 0) {
		initialConfig = applyRule(initialConfig, initialRule);
		allConfig.push(initialConfig);
	}
}	


function getRule() {
    // Prompt user for input and parse as integer
    let rule = parseInt(window.prompt("Enter the rule number (0-255):"), 10);

    // Check if rule is a valid integer in range (0,255)
    if (!Number.isInteger(rule) || rule < 0 || rule > 255) {
        alert("Invalid rule number entered. Please enter a number between 0 and 255.");
        return getRule(); // recursively call getRule() until valid input is entered
    }

    return rule;
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

			// Array with all tiles
			allTile.push(box);
		}
    }
	updateTile(allTile, allConfig, initialRule);
}


// Update the color of tile
function updateTile(tile, tileConfig, rule){
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

	// Get the rule header element
	let ruleHeader = document.getElementById('heading');

	// Update the text content of the rule header element
	ruleHeader.textContent = "Rule: " + rule;
}


module.exports = { applyRule };