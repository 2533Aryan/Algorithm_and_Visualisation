// let x = 0, y = 0;
// setInterval(() => {
//   // Update 20 times every frame
//   for (let i = 0; i < 20; i++) update();
// }, 1000/250); // 250 frames per second


// Coordinate transformations
function update() {
  let nextX, nextY;
  let r = Math.random();

  // Function 1 (Stem)
  if (r < 0.01) {
      nextX = 0;
      nextY = 0.16 * y;
  } else if (r < 0.86) {  // Function 2 (Successively smaller leaflets)
      nextX = 0.85 * x + 0.04 * y;
      nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {  // Function 3 (Largest left-hand leaflet)
      nextX = 0.20 * x - 0.26 * y;
      nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {  // Function 4 (Largest right-hand leaflet)
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

//   x = nextX;
//   y = nextY;
}


// const SVG_NS = "http://www.w3.org/2000/svg";

// const TRUNK_HEIGHT = 160;
// const TRUNK_WIDTH = 30;
// const MAX_DEPTH = 12;
// const LEFT_BRANCH_RATIO = 0.75;
// const RIGHT_BRANCH_RATIO = 0.71;
// const LEFT_ROTATION = 27;
// const RIGHT_ROTATION = -43;

// const svg = document.querySelector("#tree");
// const treeGroup = document.querySelector("#tree-group");
// const defs = document.querySelector("#tree-defs");

// const branchBasic = document.createElementNS(SVG_NS, "line");
// branchBasic.setAttributeNS(null, "id", "branch-basic");
// branchBasic.setAttributeNS(null, "class", "branch");
// branchBasic.setAttributeNS(null, "x1", "0");
// branchBasic.setAttributeNS(null, "y1", "0");
// branchBasic.setAttributeNS(null, "x2", "0");
// branchBasic.setAttributeNS(null, "y2", `${TRUNK_HEIGHT}`);
// branchBasic.setAttributeNS(null, "stroke", "black");
// branchBasic.setAttributeNS(null, "stroke-width", `${TRUNK_WIDTH}`);
// defs.appendChild(branchBasic);

// let makeBasicBranch = function (x, y, height) {
//     let trans = `translate(${x}, ${y}) scale(${height/TRUNK_HEIGHT})`;
//     let treeBranch = document.createElementNS(SVG_NS, "use");
//     treeBranch.setAttributeNS(null, "href", "#branch-basic");
//     treeBranch.setAttributeNS(null, "transform", trans);
//     return treeBranch;
// }

// let drawIteration = function (x, y, height, depth, parentGroup) {    
//     let branch = makeBasicBranch(x, y, height);
//     parentGroup.appendChild(branch);

//     if (depth < MAX_DEPTH) {

// 	let leftGroup = document.createElementNS(SVG_NS, "g");
// 	leftGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${LEFT_ROTATION})`);
// 	parentGroup.appendChild(leftGroup);
// 	drawIteration(0, 0, height * LEFT_BRANCH_RATIO, depth+1, leftGroup);

// 	let rightGroup = document.createElementNS(SVG_NS, "g");
// 	rightGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${RIGHT_ROTATION})`);
// 	parentGroup.appendChild(rightGroup);
// 	drawIteration(0, 0, height * RIGHT_BRANCH_RATIO, depth+1, rightGroup);

//     }
// }


// drawIteration(350, 50, TRUNK_HEIGHT, 0, treeGroup);
