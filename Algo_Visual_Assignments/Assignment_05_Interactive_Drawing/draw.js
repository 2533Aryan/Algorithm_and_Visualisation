// get the svg panel
const drawingPanel = document.getElementById("drawingPanel");

// set up event listeners for click and mouse movement
drawingPanel.addEventListener("mousedown", startDrawing);
drawingPanel.addEventListener("mousemove", continueDrawing);
drawingPanel.addEventListener("mouseup", endDrawing);

// variable to keep track of whether the user is currently drawing or not
let isDrawing = false;

// variable to store the starting point of the current line
let lineStart = null;

// function to start drawing
function startDrawing(event) {
	// set the starting point of the current line
	lineStart = { x: event.offsetX, y: event.offsetY };
	// set isDrawing to true
	isDrawing = true;
}

// function to continue drawing when the mouse is moved
function continueDrawing(event) {
	// if the user is not currently drawing, do nothing
	if (!isDrawing) {
		return;
	}
	// create a new line element
	const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	// set the stroke color and width
	line.setAttribute("stroke", "black");
	line.setAttribute("stroke-width", "2");
	// set the starting and ending points of the line
	line.setAttribute("x1", lineStart.x);
	line.setAttribute("y1", lineStart.y);
	line.setAttribute("x2", event.offsetX);
	line.setAttribute("y2", event.offsetY);
	// add the line to the svg panel
	drawingPanel.appendChild(line);
	// update the starting point of the current line
	lineStart = { x: event.offsetX, y: event.offsetY };
}

// function to end drawing
function endDrawing(event) {
	// set isDrawing to false
	isDrawing = false;
}
