const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

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


// function ConvexHullViewer (svg, ps) {
//     this.svg = svg;  // a n svg object where the visualization is drawn
//     this.ps = ps;    // a point set of the points to be visualized

//     this.ch = null;  // the convex hull of the point set

//     // Compute the convex hull of the point set
//     this.computeConvexHull = function() {
//         // IMPLEMENTATION OF CONVEX HULL ALGORITHM
//         // Store the resulting convex hull in this.ch
//     }

//     // Draw the points in the point set as circles on the SVG object
//     this.drawPoints = function() {
//         this.svg.selectAll("circle")
//             .data(this.ps)
//             .enter()
//             .append("circle")
//             .attr("cx", function(d) { return d.x; })
//             .attr("cy", function(d) { return d.y; })
//             .attr("r", 3)
//             .style("fill", "black");
//     }

//     // Draw the edges of the convex hull as lines on the SVG object
//     this.drawConvexHull = function() {
//         this.svg.selectAll("line")
//             .data(this.ch)
//             .enter()
//             .append("line")
//             .attr("x1", function(d) { return d.start.x; })
//             .attr("y1", function(d) { return d.start.y; })
//             .attr("x2", function(d) { return d.end.x; })
//             .attr("y2", function(d) { return d.end.y; })
//             .style("stroke", "black")
//             .style("stroke-width", 2);
//     }

//     // Update the visualization whenever the point set is modified
//     this.update = function() {
//         this.computeConvexHull();
//         this.drawPoints();
//         this.drawConvexHull();
//     }

//     // Call the update method to initialize the visualization
//     this.update();
// }

/*
 * An object representing an instance of the convex hull problem. 
 * A ConvexHull stores a PointSet ps that stores the input points, 
 * and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the 
 */
function ConvexHull (ps, viewer) {
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
        // Sort the points in ps by x-coordinate (breaking ties by y-coordinate)
        this.ps.sort();

        // Initialize a stack of points that will be used to compute the convex hull
        let stack = [];

        // Push the first two points onto the stack
        stack.push(this.ps.points[0]);
        stack.push(this.ps.points[1]);

        // Iterate over the remaining points, adding each one to the convex hull
        // and removing any points that are not part of the convex hull.
        for (let i = 2; i < this.ps.size(); i++) {
            let top = stack[stack.length - 1];
            let second = stack[stack.length - 2];
            let next = this.ps.points[i];

            // While the last three points in the stack do not form a right turn,
            // remove the second-to-last point from the stack.
            while (stack.length > 1 && (next.y - top.y) * (top.x - second.x) <= (next.x - top.x) * (top.y - second.y)) {
                stack.pop();
                top = stack[stack.length - 1];
                second = stack[stack.length - 2];
            }

            // Add the next point to the stack
            stack.push(next);
        }

        

        // Set the convex hull to the stack of points
        this.convexHull = new PointSet();
        for (let i = 0; i < stack.length; i++) {
            this.convexHull.addPoint(stack[i]);
        }

        // Reverse the order of the points in the convex hull
        this.convexHull.reverse();

        // Display the initial state of the visualization
        this.viewer.displayState(this.ps, this.convexHull);
    }

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {
        // TODO: Implement this method
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


// For tester
  try {
    exports.PointSet = PointSet;
    exports.ConvexHull = ConvexHull;
  } catch (e) {
    console.log("not running in Node");
  }
