// Define variables for drawing
let isDrawing = false;
let currentLine;

// Function to start drawing
function startDrawing(event) {
  if (event.button === 0) { // Only start drawing if left mouse button is pressed
    // Create a new line element
    currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    currentLine.setAttribute("stroke", "black");
    currentLine.setAttribute("stroke-width", "2");

    // Set the start point of the line
    const startX = event.offsetX;
    const startY = event.offsetY;
    currentLine.setAttribute("x1", startX);
    currentLine.setAttribute("y1", startY);
    currentLine.setAttribute("x2", startX); // Set the end point to the same as the start point
    currentLine.setAttribute("y2", startY);

    // Add the line to the SVG element
    drawingPanel.appendChild(currentLine);

    // Set the drawing flag
    isDrawing = true;
  }
}

// Function to continue drawing
function continueDrawing(event) {
  if (isDrawing) {
    // Update the end point of the line
    const currentX = event.offsetX;
    const currentY = event.offsetY;
    currentLine.setAttribute("x2", currentX);
    currentLine.setAttribute("y2", currentY);
  }
}

// Function to stop drawing
function stopDrawing(event) {
  // Unset the drawing flag
  isDrawing = false;
}

// Add event listeners to the SVG element
drawingPanel.addEventListener("mousedown", startDrawing);
drawingPanel.addEventListener("mousemove", continueDrawing);
drawingPanel.addEventListener("mouseup", stopDrawing);
