const SVG_NS = "http://www.w3.org/2000/svg";


// function Dfs (graph, vis) {
//     this.graph = graph;
//     this.vis = vis;
//     this.startVertex = null;
//     this.curAnimation = null;
    
//     this.visited = [];
//     this.active = [];
//     this.cur = null;

//     this.start = function () {
// 	this.startVertex = vis.highVertices.pop();
	
// 	if (this.startVertex == null) {
// 	    vis.updateTextBox("Please select a starting vertex and start again.");
// 	    return;
// 	}

// 	// todo: un-highlight previously highlighted stuff

// 	this.visited = [];
// 	this.active = [];
		
// 	this.cur = this.startVertex;
// 	this.vis.addOverlayVertex(this.cur);

// 	this.active.push(this.startVertex);
// 	this.visited.push(this.startVertex);

	
// 	this.vis.muteAll();
// 	this.vis.unmuteVertex(this.startVertex);
	
// 	console.log("Starting DFS from vertex " + this.startVertex.id);

//     }

//     this.step = function () {
	
// 	// check if execution is finished
// 	if (this.active.length == 0) {
// 	    return;
// 	}

// 	// find the next unvisited neighbor of this.cur
// 	const next = this.nextUnvisitedNeighbor();
	
// 	if (next == null) {
// 	    // if no next neighbor, cur is no longer active
// 	    const prev = this.active.pop();
// 	    this.vis.unhighlightVertex(prev);
// 	    if (this.active.length > 0) {
// 		this.cur = this.active[this.active.length - 1];
// 		const edge = this.graph.getEdge(prev, this.cur);
// 		this.vis.unhighlightEdge(edge);
// 		this.vis.moveOverlayVertex(prev, this.cur);
// 	    } else {
// 		this.vis.removeOverlayVertex(this.cur);
// 		this.cur = null;
// 	    }
// 	} else {
// 	    const edge = this.graph.getEdge(this.cur, next);
// 	    vis.unmuteEdge(edge);
// 	    vis.highlightEdge(edge);
// 	    vis.unmuteVertex(next);
// 	    vis.highlightVertex(next);
// 	    this.vis.moveOverlayVertex(this.cur, next);
// 	    this.cur = next;
// 	    this.active.push(next);
// 	    this.visited.push(next);
// 	}
//     }

//     this.nextUnvisitedNeighbor = function () {
// 	for (vtx of this.cur.neighbors) {
// 	    if (!this.visited.includes(vtx)) {
// 		return vtx;
// 	    }
// 	}
// 	return null;
//     }

//     this.animate = function () {
// 	if (this.curAnimation == null) {
// 	    this.start();
// 	    this.curAnimation = setInterval(() => {
// 		this.animateStep();
// 	    }, 1000);
// 	}
//     }

//     this.animateStep = function () {
// 	if (this.active.length > 0) {
// 	    console.log("taking a step from vertex " + this.cur.id);
// 	    this.step();
// 	} else {
// 	    this.stopAnimation();
// 	}
//     }

//     this.stopAnimation = function () {
// 	clearInterval(this.curAnimation);
// 	this.curAnimation = null;
// 	console.log("animation completed");
//     }


// }


// An object that represents a 2-d point, consisting of an
// x-coordinate and a y-coordinate. The `compareTo` function
// implements a comparison for sorting with respect to x-coordinates,
// breaking ties by y-coordinate.
function Point (x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;

    // Compare this Point to another Point p for the purposes of
    // sorting a collection of points. The comparison is according to
    // lexicographical ordering. That is, (x, y) < (x', y') if (1) x <
    // x' or (2) x == x' and y < y'.
    this.compareTo = function (p) {
	if (this.x > p.x) {
	    return 1;
	}

	if (this.x < p.x) {
	    return -1;
	}

	if (this.y > p.y) {
	    return 1;
	}

	if (this.y < p.y) {
	    return -1;
	}

	return 0;
    }

    // return a string representation of this Point
    this.toString = function () {
	return "(" + x + ", " + y + ")";
    }
}


// An object that represents a set of Points in the plane. The `sort`
// function sorts the points according to the `Point.compareTo`
// function. The `reverse` function reverses the order of the
// points. The functions getXCoords and getYCoords return arrays
// containing x-coordinates and y-coordinates (respectively) of the
// points in the PointSet.
function PointSet () {
    this.points = [];
    this.curPointID = 0;

    // create a new Point with coordintes (x, y) and add it to this
    // PointSet
    this.addNewPoint = function (x, y) {
	this.points.push(new Point(x, y, this.curPointID));
	this.curPointID++;
    }

    // add an existing point to this PointSet
    this.addPoint = function (pt) {
	this.points.push(pt);
    }

    // sort the points in this.points 
    this.sort = function () {
	this.points.sort((a,b) => {return a.compareTo(b)});
    }

    // reverse the order of the points in this.points
    this.reverse = function () {
	this.points.reverse();
    }

    // return an array of the x-coordinates of points in this.points
    this.getXCoords = function () {
	let coords = [];
	for (let pt of this.points) {
	    coords.push(pt.x);
	}

	return coords;
    }

    // return an array of the y-coordinates of points in this.points
    this.getYCoords = function () {
	let coords = [];
	for (pt of this.points) {
	    coords.push(pt.y);
	}

	return coords;
    }

    // get the number of points 
    this.size = function () {
	return this.points.length;
    }

    // return a string representation of this PointSet
    this.toString = function () {
	let str = '[';
	for (let pt of this.points) {
	    str += pt + ', ';
	}
	str = str.slice(0,-2); 	// remove the trailing ', '
	str += ']';

	return str;
    }
}


function Graph(id) {
    this.id = id;            // (unique) ID of this graph
    this.vertices = [];      // set of vertices in this graph
    this.nextVertexID = 0;   // ID to be assigned to next vtx
    
    // create a and return a new vertex at a given location
    this.createVertex = function (x, y) {
        const vtx = new Vertex(this.nextVertexID, this, x, y);
        this.nextVertexID++;
        return vtx;
    }

    // add vtx to the set of vertices of this graph, if the vtx is not
    // already stored as a vertex
    this.addVertex = function(vtx) {
        if (!this.vertices.includes(vtx)) {
            this.vertices.push(vtx);
            console.log("added vertex with id " + vtx.id);
        } else {
            console.log("vertex with id " + vtx.id + " not added because it is already a vertex in the graph.");
        }
    }
}


function Vertex(id, graph, x, y) {
    this.id = id;        // the unique id of this vertex
    this.graph = graph;  // the graph containing this vertex
    this.x = x;          // x coordinate of location
    this.y = y;          // y coordinate of location
}


function ConvexHullViewer (svg, ps, graph) {
    this.svg = svg;  // a n svg object where the visualization is drawn
    this.ps = ps;    // a point set of the points to be visualized
    
    this.graph = graph;      // the graph we are visualizing

    // define the behavior for clicking on the svg element
    this.svg.addEventListener("click", (e) => {
        // create a new vertex
        this.createVertex(e);
    });


    // create svg group for displaying vertices
    this.vertexGroup = document.createElementNS(SVG_NS, "g");
    this.vertexGroup.id = "graph-" + graph.id + "-vertices";
    this.svg.appendChild(this.vertexGroup);


    this.vertexElts = [];   // svg elements for vertices

    // create a new vertex 
    this.createVertex = function (e) {
        const rect = this.svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const vtx = graph.createVertex(x, y);
        this.addVertex(vtx);
        this.graph.addVertex(vtx);
    }

    // add a vertex to the visualization by creating an svg element
    this.addVertex = function (vtx) {
        const elt = document.createElementNS(SVG_NS, "circle");
        elt.classList.add("vertex");
        elt.setAttributeNS(null, "cx", vtx.x);
        elt.setAttributeNS(null, "cy", vtx.y);

        elt.addEventListener("click", (e) => {
            e.stopPropagation(); // don't create another vertex (i.e., call event listener for the svg element in addition to the vertex
        });

        this.vertexGroup.appendChild(elt);
        this.vertexElts[vtx.id] = elt; 

        // Add points
        ps.addNewPoint(vtx.x, vtx.y);
        
        // solve the current convex hull
        const hull = new ConvexHull(ps, null);
        hull.solveConvexHull();
    }
}


/*
 * An object representing an instance of the convex hull problem. 
 * A ConvexHull stores a PointSet ps that stores the input points, 
 * and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the 
 */
function ConvexHull (ps, viewer) {
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization
    
    // this.startVertex = null;
    // this.curAnimation = null;
    
    // this.visited = [];
    // this.active = [];
    // this.cur = null;

    // actually solve problem
    this.solveConvexHull = function () {
        ps = this.getConvexHull();
        console.log(ps.points);
    }

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
        console.log(1);
        // this.startVertex = vis.highVertices.pop();
        

        // this.visited = [];
        // this.active = [];
            
        // this.cur = this.startVertex;
        // this.vis.addOverlayVertex(this.cur);

        // this.active.push(this.startVertex);
        // this.visited.push(this.startVertex);

        
        // this.vis.muteAll();
        // this.vis.unmuteVertex(this.startVertex);
        
        // console.log("Starting DFS from vertex " + this.startVertex.id);
    }

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {

    }

    // Return a new PointSet consisting of the points along the convex hull of ps
    this.getConvexHull = function () {
        // Start by sorting the points in the point set
        this.ps.sort();
        
        // Create two empty stacks: the lower hull and the upper hull
        var lowerHull = [];
        var upperHull = [];

        // Process each point in the sorted point set
        for (var i = 0; i < this.ps.size(); i++) {
            var p = this.ps.points[i];
                
            // Build the lower hull
            while (lowerHull.length >= 2) {
                var q = lowerHull[lowerHull.length - 1];
                var r = lowerHull[lowerHull.length - 2];
                if ((p.y - r.y) * (r.x - q.x) >= (r.y - q.y) * (p.x - r.x)) {
                    lowerHull.pop();
                } else {
                    break;
                }
            }
            lowerHull.push(p);

            // Build the upper hull
            while (upperHull.length >= 2) {
                var q = upperHull[upperHull.length - 1];
                var r = upperHull[upperHull.length - 2];
                if ((p.y - r.y) * (r.x - q.x) <= (r.y - q.y) * (p.x - r.x)) {
                    upperHull.pop();
                } else {
                    break;
                }
            }
            upperHull.push(p);
        }
        
        // Combine the lower and upper hulls into a single hull
        upperHull.pop();
        var hullPoints = upperHull.concat(lowerHull.reverse());

        // Create a new PointSet to hold the convex hull points
        var hull = new PointSet();
        for (var i = 0; i < hullPoints.length; i++) {
            hull.addPoint(hullPoints[i]);
        }

        // Return the convex hull PointSet
        return hull;
    };
}



const svg = document.querySelector("#convex-hull-box");
const graph = new Graph(0);
const ps = new PointSet();    
const viewer = new ConvexHullViewer(svg, ps, graph);
const ch = new ConvexHull(ps, viewer);



// For tester
  try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
  }