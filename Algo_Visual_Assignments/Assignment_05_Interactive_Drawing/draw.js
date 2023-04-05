// Add event listeners to the SVG element
drawingPanel.addEventListener("mousedown", startDrawing);
drawingPanel.addEventListener("mousemove", continueDrawing);
drawingPanel.addEventListener("mouseup", stopDrawing);

// Define variables for drawing
let isDrawing = false;
let currentShape = 'line'; // Default to drawing lines
let currentElement;

// Function to start drawing
function startDrawing(event) {
  if (event.button === 0) { // Only start drawing if left mouse button is pressed
	
	// Set the start point of the line
	const startX = event.offsetX;
	const startY = event.offsetY;
    
	switch (currentShape) {
      case 'line':
        // Create a new line element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
		
		  currentElement.setAttribute("x1", startX);
    	currentElement.setAttribute("y1", startY);
    	currentElement.setAttribute("x2", startX); // Set the end point to the same as the start point
    	currentElement.setAttribute("y2", startY);
        break;

      case 'rect':
        // Create a new rectangle element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
        currentElement.setAttribute("fill", "transparent");
		
		    currentElement.setAttribute("x", startX);
    	  currentElement.setAttribute("y", startY);
        break;

      case 'circle':
        // Create a new circle element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
        currentElement.setAttribute("fill", "transparent");

		currentElement.setAttribute("cx", startX);
    	currentElement.setAttribute("cy", startY);
        break;
    }

	// Add the shape to the SVG element
    drawingPanel.appendChild(currentElement);

    // Set the drawing flag
    isDrawing = true;
  }
}

// Function to continue drawing
function continueDrawing(event) {
  if (isDrawing) {
    // Update the size and position of the shape
    const currentX = event.offsetX;
    const currentY = event.offsetY;
    switch (currentShape) {
      case 'line':
        currentElement.setAttribute("x2", currentX);
        currentElement.setAttribute("y2", currentY);
        break;

      case 'rect':
        const width = Math.abs(currentX - currentElement.getAttribute("x"));
        const height = Math.abs(currentY - currentElement.getAttribute("y"));
        currentElement.setAttribute("width", width);
        currentElement.setAttribute("height", height);
        break;

      case 'circle':
        const dx = currentX - currentElement.getAttribute("cx");
        const dy = currentY - currentElement.getAttribute("cy");
        const radius = Math.sqrt(dx*dx + dy*dy);
        currentElement.setAttribute("r", radius);
        break;
    }
  }
}

// Function to stop drawing
function stopDrawing(event) {
	// Unset the drawing flag
	isDrawing = false;
}

// Function to switch drawing modes
function setDrawingMode(mode) {
	currentShape = mode;
}



// Create a new div element
const rootDiv = document.getElementById("root");
const modeButton = document.createElement("div");
rootDiv.appendChild(modeButton);

// Set id for new div element
modeButton.setAttribute("id", "mode-button");

// Line button
const lineButton = document.createElement("button");
lineButton.textContent = "Line";

// Circle button
const circleButton = document.createElement("button");
circleButton.textContent = "Circle";

// Rect button
const rectButton = document.createElement("button");
rectButton.textContent = "Rect";

modeButton.appendChild(lineButton);
modeButton.appendChild(circleButton);
modeButton.appendChild(rectButton);


// User clicked line button
lineButton.addEventListener("click", lineWorking);

function lineWorking(){
	// Disable line button
	lineButton.disabled = true;
	
	// Enable circle and rect button
	circleButton.disabled = false;
	rectButton.disabled = false;

	// Set mode to line
	setDrawingMode("line");
}


// User clicked circle button
circleButton.addEventListener("click", circleWorking);

function circleWorking(){
	// Disable circle button
	circleButton.disabled = true;
	
	// Enable circle and rect button
	lineButton.disabled = false;
	rectButton.disabled = false;

	// Set mode to circle
	setDrawingMode("circle");
}


// User clicked rect button
rectButton.addEventListener("click", rectWorking);

function rectWorking(){
	// Disable rect button
	rectButton.disabled = true;
	
	// Enable line and circle button
	lineButton.disabled = false;
	circleButton.disabled = false;

	// Set mode to rect
	setDrawingMode("rect");
}



// Create a new div element - Fill Color Block
const fillColor = document.createElement("div");
fillColor.setAttribute("id", "fill-color")
rootDiv.appendChild(fillColor);

// Text for color fill button
const fillText = document.createElement("p");
fillText.textContent = "Choose color (click shapes to fill): ";
fillColor.appendChild(fillText);


// Function to fill a shape when it's clicked
function fillShape(event) {
  if (event.target.tagName === "rect" || event.target.tagName === "circle") {
    event.target.setAttribute("fill", fillColorButton.value);
  }
}

// Create a new button element for selecting fill color
const fillColorButton = document.createElement("input");
fillColorButton.setAttribute("type", "color");
fillColorButton.setAttribute("value", "#000000");
fillColor.appendChild(fillColorButton);

// Add event listener to SVG element for filling a shape
drawingPanel.addEventListener("click", fillShape);


