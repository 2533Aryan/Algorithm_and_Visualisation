// Generate a single point of the Barnsley fern fractal
function generatePoint(x, y, iterations) {
    // Base case: stop iterating after a certain number of iterations
    if (iterations === 0) {
        return;
    }

    // Select a transformation at random
    let r = Math.random();
    let nextX, nextY;


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


    // Draw the point on the canvas

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

    // Recursively generate the next point
    generatePoint(nextX, nextY, iterations - 1);
}

// Generate the entire Barnsley fern fractal using recursion
function generateFractal(iterations) {
    // Initial point
    let x = 0, y = 0;

    for (let i = 0; i < iterations; i++) {
        generatePoint(x, y, iterations);
    }
}

// Call the generateFractal function to generate the Barnsley fern fractal with 200 iterations
// generateFractal(200);