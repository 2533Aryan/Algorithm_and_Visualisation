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

const NUM_COLUMNS = 32;
const NUM_ROWS = 20;
const TILE_BORDER = 0.5;
const TILE_SIZE = 20;
const TILE_INNER = TILE_SIZE - 2 * TILE_BORDER; 	

const CONTAINER_WIDTH = NUM_COLUMNS * TILE_SIZE;
const CONTAINER_HEIGHT = NUM_ROWS * TILE_SIZE;


// initial configuration => first row
let initialConfig = []
for(let i=0; i<NUM_COLUMNS; i++){
	if(i === 15){
		initialConfig.push(1);	
	} else{
		initialConfig.push(0);
	}
}

// initial rule => 50
const initialRule = 50;

// all configuration
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

// console.log(allConfig.length);



function drawGrid() {

    // make the container the right size
    const container = document.querySelector('#grid-background');
    container.style.width = CONTAINER_WIDTH + "px";
    container.style.height = CONTAINER_HEIGHT + "px";

    for (let i = 0; i < NUM_COLUMNS; i++) {
		for (let j = 0; j < NUM_ROWS; j++) {
			// make a new div for a box
			let box = document.createElement('div');

			box.id = 'tile' + i + '-' + j;

			// make box's class 'tile'
			box.classList.add('tile');

			// compute coordinates for this box
			let x = i * TILE_SIZE;
			let y = j * TILE_SIZE;

			box.style.left = x + 'px';
			box.style.top = y + 'px';

			// set the size of the box
			box.style.width = TILE_INNER + 'px';
			box.style.height = TILE_INNER + 'px';

			// set the color of the box
			box.style.backgroundColor = "white";
			box.style.borderColor = "rgb(64, 64, 64)";


			// if (j == 0 && i == 15) {
			// 	box.style.backgroundColor = "black";
			// }
			
			let tile = document.querySelector("#tile");


			// // update tiles
			// if(i === NUM_COLUMNS - 1){
			// 	let currentConfig = allConfig[j];
			// 	currentConfig.forEach(element => {
			// 		if(element === 1) {
			// 			tile.style.backgroundColor = "black";
			// 			console.log(1)
			// 		} else {
			// 			tile.style.backgroundColor = "white";
			// 		}
			// 		// console.log(element);
			// 	});
			// }
			
			// make the box a child of container
			container.appendChild(box);
		}
    }
}



// function tileUpdate(e) {
//     const textBox = document.querySelector("#text-box");
//     let tile = e.target;
//     if (tile.style.backgroundColor == "black") {
// 		tile.style.backgroundColor = "white";
//     } else {
// 		tile.style.backgroundColor = "black";	    
//     }
// }



module.exports = { applyRule };