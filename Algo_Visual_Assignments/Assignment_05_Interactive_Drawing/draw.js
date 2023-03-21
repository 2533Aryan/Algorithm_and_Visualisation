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

// // get the svg panel
// const drawingPanel = document.getElementById("drawingPanel");

// // set up event listeners for click and mouse movement
// drawingPanel.addEventListener("mousedown", startDrawing);
// drawingPanel.addEventListener("mousemove", draw);
// drawingPanel.addEventListener("mouseup", endDrawing);

// // variable to keep track of whether the user is currently drawing or not
// let isDrawing = false;

// // variable to store the path element for the current drawing
// let currentPath = null;

// // function to start drawing
// function startDrawing(event) {
// 	// create a new path element
// 	currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
// 	// set the stroke color and width
// 	currentPath.setAttribute("stroke", "black");
// 	currentPath.setAttribute("stroke-width", "2");
// 	// move the starting point of the path to the mouse position
// 	currentPath.setAttribute("d", `M${event.offsetX},${event.offsetY}`);
// 	// add the path to the svg panel
// 	drawingPanel.appendChild(currentPath);
// 	// set isDrawing to true
// 	isDrawing = true;
// }

// // function to draw when the mouse is moved
// function draw(event) {
// 	// if the user is not currently drawing, do nothing
// 	if (!isDrawing) {
// 		return;
// 	}
// 	// append a line segment to the current path from the previous position to the current position
// 	currentPath.setAttribute("d", `${currentPath.getAttribute("d")} L${event.offsetX},${event.offsetY}`);
// }

// // function to end drawing
// function endDrawing(event) {
// 	// set isDrawing to false
// 	isDrawing = false;
// }

// const ns = "http://www.w3.org/2000/svg";

// const box = document.querySelector("#dot-box");
// box.addEventListener("click", drawDot);

// function drawDot(e) {
//     console.log("you drew a dot!");

//     /* complete this */
//     const para = document.querySelector(".text-box");
//     para.innerHTML = para.innerHTML + "you clicked the box!<br/>"

// }


// function drawDot(e) {
//     let rect = box.getBoundingClientRect();
//     let x = e.clientpX - rect.left;
//     let y = e.clientY - rect.top;
//     // console.log("Clicked: " + x + ", " + y);
//     let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     dot.setAttributeNS(null, "cx", x);
//     dot.setAttributeNS(null, "cy", y);
//     dot.classList.add("dot");
//     box.appendChild(dot);
    
// }
