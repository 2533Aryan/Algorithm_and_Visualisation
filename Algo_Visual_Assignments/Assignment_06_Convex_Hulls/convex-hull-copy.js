const SVG_NS = "http://www.w3.org/2000/svg";


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

// an object representing an edge in a graph
function Edge (vtx1, vtx2, id) {
    this.vtx1 = vtx1;   // first endpoint of the edge
    this.vtx2 = vtx2;   // second endpoint of the edge
    this.id = id;       // the unique identifier of this edge
}

function ConvexHullViewer (svg, ps, graph) {
    this.svg = svg;  // a n svg object where the visualization is drawn
    this.ps = ps;    // a point set of the points to be visualized
    
    this.graph = graph;      // the graph we are visualizing

    this.edges = [];         // set of edges in this graph    
    this.nextEdgeID = 0;     // ID to be assigned to next edge


    // define the behavior for clicking on the svg element
    this.svg.addEventListener("click", (e) => {
        // create a new vertex
        this.createVertex(e);
    });


    // create svg group for displaying edges
    this.edgeGroup = document.createElementNS(SVG_NS, "g");
    this.edgeGroup.id = "graph-" + graph.id + "-edges";
    this.svg.appendChild(this.edgeGroup);


    // create svg group for displaying vertices
    this.vertexGroup = document.createElementNS(SVG_NS, "g");
    this.vertexGroup.id = "graph-" + graph.id + "-vertices";
    this.svg.appendChild(this.vertexGroup);


    this.vertexElts = [];   // svg elements for vertices
    this.edgeElts = [];     // svg elements for edges


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
    }


    // create and return an edge between vertices vtx1 and vtx2;
    // returns existing edge if there is already an edge between the
    // two vertices
    this.addEdge = function(vtx1, vtx2) { 
        const edge = new Edge(vtx1, vtx2, this.nextEdgeID);
        this.nextEdgeID++;
        this.edges.push(edge);
        console.log("added edge (" + vtx1.id + ", " + vtx2.id + ")");
        return edge;
    } 
       
    
    // add an edge to the visualization
    this.visEdge = function (edge) {
        const vtx1 = edge.vtx1;
        const vtx2 = edge.vtx2;
        const edgeElt = document.createElementNS(SVG_NS, "line");
        edgeElt.setAttributeNS(null, "x1", vtx1.x);
        edgeElt.setAttributeNS(null, "y1", vtx1.y);
        edgeElt.setAttributeNS(null, "x2", vtx2.x);
        edgeElt.setAttributeNS(null, "y2", vtx2.y);
        edgeElt.classList.add("edge");
        this.edgeElts[edge.id] = edgeElt;
        this.edgeGroup.appendChild(edgeElt);
    }


    // overlay vertices
    this.overlayVertices = [];

    // create svg group for displaying overlays
    this.overlayGroup = document.createElementNS(SVG_NS, "g");
    this.overlayGroup.id = "graph-" + graph.id + "-overlay";
    this.svg.appendChild(this.overlayGroup);

    this.addOverlayVertex = function (vtx) {
        const elt = document.createElementNS(SVG_NS, "circle");
        elt.classList.add("overlay-vertex");
        elt.setAttributeNS(null, "cx", vtx.x);
        elt.setAttributeNS(null, "cy", vtx.y);
        this.overlayGroup.appendChild(elt);
        this.overlayVertices[vtx.id] = elt;
    }
    
    
    /*********************************************************
     * Methods to (un)highlight and (un) mute vertices/edges *
     *********************************************************/


    this.highlightVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.add("highlight");
    }
    
    this.unhighlightVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.remove("highlight");	
    }
    
    this.muteVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.add("muted");
    }
    
    this.unmuteVertex = function (vtx) {
        const elt = this.vertexElts[vtx.id];
        elt.classList.remove("muted");
    }
    
    this.highlightEdge = function (e) {
        const elt = this.edgeElts[e.id];
        elt.classList.add("highlight");	
    }

    this.unhighlightEdge = function (e) {
        const elt = this.edgeElts[e.id];
        elt.classList.remove("highlight");	
    }

    this.muteEdge = function (e) {
        const elt = this.edgeElts[e.id];
        elt.classList.add("muted");
    }

    this.unmuteEdge = function (e) {
        const elt = this.edgeElts[e.id];
        elt.classList.remove("muted");
    }

    this.muteAllVertices = function () {
        for (vtx of this.graph.vertices) {
            this.muteVertex(vtx);
        }
    }

    this.muteAllEdges = function () {
        for (e of this.graph.edges) {
            this.muteEdge(e);
        }
    }

    this.muteAll = function () {
        this.muteAllVertices();
        this.muteAllEdges();
    }

    this.unmuteAllVertices = function () {
        for (vtx of this.graph.vertices) {
            this.unmuteVertex(vtx);
        }
    }

    this.unmuteAllEdges = function () {
        for (e of this.graph.edges) {
            this.unmuteEdge(e);
        }
    }

    this.unmuteAll = function () {
        this.unmuteAllVertices();
        this.unmuteAllEdges();
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
    
    // initial vertex
    this.startVertex = null;
    this.index = 0;

    this.curAnimation = null;
    
    // this.visited = [];
    // this.active = [];
    // this.cur = null;

    // Counter for all points stack
    var counter = 2;

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
        // Sort pointset 
        this.ps.sort();
        // console.log(this.ps.points);
        
        // Empty
        if (this.ps.size() == 0) {
            console.log("empty");
        } else {
            // Initialize Hull
            this.hullStack = [this.ps.points[0], this.ps.points[1]];

            // Overlay
            this.viewer.highlightVertex(this.hullStack[0]);
        } 
    }

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {
        // index
        var index = this.hullStack.length;

        // Hull Stack just has two element
        if (index == 2) {
            // highlight vertex
            this.viewer.highlightVertex(this.hullStack[1]);
            index++;
        }

        // Set three points
        var p = this.ps.points[index - 2];
        var q = this.ps.points[index - 1];
        var r = this.ps.points[index];

        // Right turn
        if (this.rightTurn(p, q, r)){
            this.hullStack.push(q);

            //draw
            this.viewer.highlightVertex(this.hullStack[this.hullStack.length - 1]);

            // increment index
            index++;
        } else {
            this.hullStack.pop();

            //draw
            this.viewer.unhighlightVertex(this.hullStack[this.hullStack.length - 1]);

            // increment index
            index++;
        }

        console.log(this.rightTurn(p, q, r));

        // Hull stack has more than one vertex - join first edge
        // if(this.hullStack.length == 2 ) {
        //     // this.viewer.highlightVertex(this.hullStack[1]);    
        //     this.viewer.addOverlayVertex(this.hullStack[1]);    
            
        //     // edge
        //     const currentEdge = this.viewer.addEdge(this.hullStack[0], this.hullStack[1]);
        //     this.viewer.visEdge(currentEdge);            
        // } 

        console.log(this.hullStack);
    }

    // Orientation
    this.rightTurn = function(p, q, r) {
        var orientation = (q.y - p.y)*(r.x - q.x) - (q.x - p.x)*(r.y-q.y);

        // Clockwise orientation (right turn)
        if(orientation < 0) {
            return true;
        } else{  // Counterclockwise orientation (left turn)
            return false;
        }
    }

    // perform animation
    this.animate = function () {
        if (this.curAnimation == null) {
            this.start();
            this.curAnimation = setInterval(() => {
                this.animateStep();
            }, 1000);
        }
    }
    
    this.animateStep = function () {
        if (this.active.length > 0) {
            this.step();
        } else {
            this.stopAnimation();
        }
    }
    
    this.stopAnimation = function () {
        clearInterval(this.curAnimation);
        this.curAnimation = null;
        this.viewer.unmuteAllVertices();
        console.log("animation completed");
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


var svg;
var graph;
var ps;    
var viewer;
var hull;


function main() {
    svg = document.querySelector("#convex-hull-box");
    graph = new Graph(0);
    ps = new PointSet();    
    viewer = new ConvexHullViewer(svg, ps, graph);     
    hull = new ConvexHull(ps, viewer);
}



// For tester
  try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
  }