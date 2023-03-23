// get the svg panel
const drawingPanel = document.getElementById("drawingPanel");

// set up event listeners for click and mouse movement
drawingPanel.addEventListener("mousedown", startDrawing);
drawingPanel.addEventListener("mousemove", continueDrawing);
drawingPanel.addEventListener("mouseup", endDrawing);

// variable to keep track of whether the user is currently drawing or not
let isDrawing = false;

let isDrawingCircle = false;
drawingPanel.addEventListener("dblclick", startDrawingCircle);
let circleCenter = null;

function startDrawingCircle(event) {
	// set the center point of the current circle
	circleCenter = { x: event.offsetX, y: event.offsetY };
	
	// set isDrawingCircle to true
	isDrawingCircle = true;
  }
  

// variable to store the starting point of the current line
let lineStart = null;

// function to start drawing
function startDrawing(event) {
	// set the starting point of the current line
	lineStart = { x: event.offsetX, y: event.offsetY };

	// set isDrawing to true
	isDrawing = true;
}

function continueDrawing(event) {
	// if the user is not currently drawing, do nothing
	if (!isDrawing && !isDrawingCircle) {
	  return;
	}
	
	// if the user is currently drawing a circle, create a new circle element
	if (isDrawingCircle) {
	  // calculate the radius of the circle
	  const dx = event.offsetX - circleCenter.x;
	  const dy = event.offsetY - circleCenter.y;
	  const radius = Math.sqrt(dx*dx + dy*dy);
	  
	  // create a new circle element
	  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	  
	  // set the stroke color and width
	  circle.setAttribute("stroke", "black");
	  circle.setAttribute("stroke-width", "4");
	  
	  // set the center point and radius of the circle
	  circle.setAttribute("cx", circleCenter.x);
	  circle.setAttribute("cy", circleCenter.y);
	  circle.setAttribute("r", radius);
	  
	  // add the circle to the svg panel
	  drawingPanel.appendChild(circle);
	}
	// if the user is currently drawing a line, create a new line element
	else {
	  // create a new line element
	  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		// set the stroke color and width
		line.setAttribute("stroke", "black");
		line.setAttribute("stroke-width", "4");

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
}
	  

// function to end drawing
function endDrawing(event) {
	// set isDrawing to false
	isDrawing = false;
	isDrawingCircle = false;
}