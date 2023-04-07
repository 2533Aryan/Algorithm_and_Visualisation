// Initial point
let x = 0, y = 0;

// Draw Barnsley fern
function draw(){
    // Update 20 times every frame
    for (let i = 0; i < 60000; i++) {
        update();
    }    
}

// Coordinate transformations
function update() {
    // Next value of x and y
    let nextX, nextY;
    let r = Math.random();

    // Transformations
    if (r < 0.01) {
        // Function 1 (Stem)
        nextX = 0;
        nextY = 0.16 * y;
    } else if (r < 0.86) {  
        // Function 2 (Successively smaller leaflets)
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93) {  
        // Function 3 (Largest left-hand leaflet)
        nextX = 0.20 * x - 0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
    } else {  
        // Function 4 (Largest right-hand leaflet)
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
    }

    // Scaling and positioning
    let plotX = 300 * (x + 3) / 6;
    let plotY = 400 - 400 * ((y + 2) / 14);

    // Points as circle
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttributeNS(null, "cx", plotX);
    circle.setAttributeNS(null, "cy", plotY);
    circle.setAttributeNS(null, "r", "1");
    circle.setAttributeNS(null, "fill", "green");
    document.querySelector("svg").appendChild(circle);

    // Update x and y
    x = nextX;
    y = nextY;
}

draw()