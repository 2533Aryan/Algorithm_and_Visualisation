const NUM_COLUMNS = 32;
const NUM_ROWS = 16;
const TILE_BORDER = 0.5;
const TILE_SIZE = 20;
const TILE_INNER = TILE_SIZE - 2 * TILE_BORDER; 	

const CONTAINER_WIDTH = NUM_COLUMNS * TILE_SIZE;
const CONTAINER_HEIGHT = NUM_ROWS * TILE_SIZE;

function applyRule(config, rule) {
    const n = config.length;
    const updated = [];
    for (let i = 0; i < n; i++) {
        const left = (i === 0) ? config[n - 1] : config[i - 1];
        const center = config[i];
        const right = (i === n - 1) ? config[0] : config[i + 1];
        const index = (left << 2) + (center << 1) + right;
        updated.push((rule & (1 << index)) ? 1 : 0);
    }
    return updated;
}

function drawRuleBox() {
    const ruleBox = document.querySelector("#rules");
    ruleBox.style.width = CONTAINER_WIDTH + 'px';
    ruleBox.style.height = 3 * TILE_SIZE + 'px';
    ruleBox.style.backgroundColor = "white";
    
    for (let j = 7; j >= 0; j--) {
	
	let ruleContainer = document.createElement('div');
	ruleContainer.classList.add('float-container');
	ruleContainer.style.width = 3 * TILE_SIZE + 'px';
	ruleContainer.style.height = 2 * TILE_SIZE + 'px';

	for (let i = 0; i < 4; i++) {
	    let tile = document.createElement('div')
	    tile.classList.add('rule-tile');
	    tile.style.left = i * TILE_SIZE + 'px';
	    tile.style.top = '0px';
	    tile.style.width = TILE_INNER + 'px';
	    tile.style.height = TILE_INNER + 'px';

	    if (i < 3) {
		let bit = Math.floor(j / Math.pow(2, 2-i)) % 2;
		if (bit == 0) {
		    tile.style.backgroundColor = 'white';
		} else {
		    tile.style.backgroundColor = 'black';		    
		}
	    }
	    

	    if (i == 3) {
		tile.style.left = TILE_SIZE + 'px';
		tile.style.top = TILE_SIZE + 'px';
		tile.style.backgroundColor = 'white';
		tile.addEventListener("click", tileUpdate);
	    }
	    ruleContainer.appendChild(tile);
	}

	ruleBox.appendChild(ruleContainer);
    }

    
}

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
	    let h = 32 * (i + 2 * j) / 5 + 150;
	    let s = 100 - 5 * j;
	    let l = 50 + 5 * (i - j) / 2;
	    box.style.backgroundColor = "white";
	    box.style.borderColor = "rgb(64, 64, 64)";

	    if (j == 0 && i == 15) {
		box.style.backgroundColor = "black";
	    }

	    // make interactions!
	    if (j > 0) {
		box.addEventListener("click", tileUpdate);
	    }

	    // make the box a child of container
	    container.appendChild(box);
	}
    }
}

function tileUpdate(e) {
    const textBox = document.querySelector("#text-box");
    let tile = e.target;
    if (tile.style.backgroundColor == "black") {
		tile.style.backgroundColor = "white";
    } else {
		tile.style.backgroundColor = "black";	    
    }
}