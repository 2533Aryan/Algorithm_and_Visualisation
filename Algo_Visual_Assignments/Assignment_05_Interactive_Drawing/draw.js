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
    switch (currentShape) {
      case 'line':
        // Create a new line element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
        break;
      case 'rect':
        // Create a new rectangle element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
        currentElement.setAttribute("fill", "transparent");
        break;
      case 'circle':
        // Create a new circle element
        currentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        currentElement.setAttribute("stroke", "black");
        currentElement.setAttribute("stroke-width", "4");
        currentElement.setAttribute("fill", "transparent");
        break;
    }

    // Set the start point of the line
    const startX = event.offsetX;
    const startY = event.offsetY;
    currentElement.setAttribute("x1", startX);
    currentElement.setAttribute("y1", startY);
    currentElement.setAttribute("x2", startX); // Set the end point to the same as the start point
    currentElement.setAttribute("y2", startY);
    currentElement.setAttribute("cx", startX);
    currentElement.setAttribute("cy", startY);

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
        const width = currentX - currentElement.getAttribute("x");
        const height = currentY - currentElement.getAttribute("y");
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

// Function to change the stroke color
function setStrokeColor(color) {
  if (currentElement) {
    currentElement.setAttribute("stroke", color);
  }
}

// Function to change the fill color (for rectangles and circles)
function setFillColor(color) {
  if (currentElement && (currentShape === 'rect' || currentShape === 'circle')) {
    currentElement.setAttribute("fill", color);
  }
}


// Create a new div element
const currentDiv = document.getElementById("root");
const modeButton = document.createElement("div");
currentDiv.appendChild(modeButton);

// Set id for new div element
modeButton.setAttribute("id", "mode-button");

// Create mode button
const button = document.createElement("button");
button.textContent = "Click me!"; // set the text of the button
modeButton.appendChild(button);


setDrawingMode();