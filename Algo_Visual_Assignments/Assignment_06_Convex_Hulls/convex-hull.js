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


function ConvexHullViewer (svg, ps) {
    this.svg = svg;  // a n svg object where the visualization is drawn
    this.ps = ps;    // a point set of the points to be visualized

    // COMPLETE THIS OBJECT

    // create a circle for each point in the point set
    this.drawPoints = function () {
        let radius = 3;
        let circles = this.svg.selectAll("circle")
            .data(this.ps.points)
            .enter().append("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", radius)
            .attr("fill", "black");
    }

    // draw a line segment between two points
    this.drawLine = function (p1, p2, color="black") {
        this.svg.append("line")
            .attr("x1", p1.x)
            .attr("y1", p1.y)
            .attr("x2", p2.x)
            .attr("y2", p2.y)
            .attr("stroke-width", 2)
            .attr("stroke", color);
    }

    // draw the edges of the convex hull as a closed polygon
    this.drawConvexHull = function (hullPoints) {
        // add the first point to the end of the array to close the polygon
        hullPoints.push(hullPoints[0]);

        // draw the line segments between each pair of adjacent points in the convex hull
        for (let i = 0; i < hullPoints.length - 1; i++) {
            let p1 = hullPoints[i];
            let p2 = hullPoints[i+1];
            this.drawLine(p1, p2, "red");
        }
    }

    // highlight a single point
    this.highlightPoint = function (pt) {
        this.svg.append("circle")
            .attr("cx", pt.x)
            .attr("cy", pt.y)
            .attr("r", 5)
            .attr("fill", "red");
    }
}

/*
 * An object representing an instance of the convex hull problem. A ConvexHull stores a PointSet ps that stores the input points, and a ConvexHullViewer viewer that displays interactions between the ConvexHull computation and the 
 */
function ConvexHull (ps, viewer) {
    this.ps = ps;          // a PointSet storing the input to the algorithm
    this.viewer = viewer;  // a ConvexHullViewer for this visualization


  // Return a new PointSet consisting of the points along the convex
  // hull of ps. This method should **not** perform any
  // visualization. It should **only** return the convex hull of ps
  // represented as a (new) PointSet. Specifically, the elements in
  // the returned PointSet should be the vertices of the convex hull
  // in clockwise order, starting from the left-most point, breaking
  // ties by minimum y-value.
  this.getConvexHull = function() {
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
    lowerHull.pop();
    upperHull.pop();
    var hullPoints = lowerHull.concat(upperHull.reverse());

    // Create a new PointSet to hold the convex hull points
    var hull = new PointSet();
    for (var i = 0; i < hullPoints.length; i++) {
      hull.addPoint(hullPoints[i]);
    }

    // Return the convex hull PointSet
    return hull;
  };

    // start a visualization of the Graham scan algorithm performed on ps
    this.start = function () {
	
	// COMPLETE THIS METHOD

  // Return a new PointSet consisting of the points along the convex
  // hull of ps. This method should **not** perform any
  // visualization. It should **only** return the convex hull of ps
  // represented as a (new) PointSet. Specifically, the elements in
  // the returned PointSet should be the vertices of the convex hull
  // in clockwise order, starting from the left-most point, breaking
  // ties by minimum y-value.
  this.getConvexHull = function() {
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
    lowerHull.pop();
    upperHull.pop();
    var hullPoints = lowerHull.concat(upperHull.reverse());

    // Create a new PointSet to hold the convex hull points
    var hull = new PointSet();
    for (var i = 0; i < hullPoints.length; i++) {
      hull.addPoint(hullPoints[i]);
    }

    // Return the convex hull PointSet
    return hull;
  };
	
    }

    // perform a single step of the Graham scan algorithm performed on ps
    this.step = function () {
	
	// COMPLETE THIS METHOD
	
    }

    // Return a new PointSet consisting of the points along the convex
    // hull of ps. This method should **not** perform any
    // visualization. It should **only** return the convex hull of ps
    // represented as a (new) PointSet. Specifically, the elements in
    // the returned PointSet should be the vertices of the convex hull
    // in clockwise order, starting from the left-most point, breaking
    // ties by minimum y-value.
    this.getConvexHull = function () {

	// COMPLETE THIS METHOD
	
    }
}
