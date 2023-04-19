const SVG_NS = "http://www.w3.org/2000/svg";      

function KMeans (k) {
    // the number of clusters to be found; for now this is a fixed
    // constant value
    this.k = k;

    // the x- and y-coordinates of the means
    this.xMeans = new Array(k).fill(0);
    this.yMeans = new Array(k).fill(0);

    // the x- and y-coordinates of the data points
    this.xPoints = [];
    this.yPoints = [];

    // the index of the nearest mean to each point; i.e., clusters[i]
    // = j if point i's nearest mean is mean j
    this.clusters = [];

    // true if the means have already been initialized
    this.initalized = false;

    // If the means have not already been initialized, then initialize
    // them by assigning them random values. Otherwise, just update the
    // clusters.
    this.initializeMeans = function () {

	if (!this.initialized) {

	    // compute the maximum and minimum x and y coordinates of points in points
	    let xMin = Math.min.apply(null, this.xPoints);
	    let yMin = Math.min.apply(null, this.yPoints);
	    let xMax = Math.max.apply(null, this.xPoints);
	    let yMax = Math.max.apply(null, this.yPoints);

	    // generate random initial points
	    for (let i = 0; i < this.k; i++) {
		this.xMeans[i] = (xMax - xMin) * Math.random() + xMin;
		this.yMeans[i] = (yMax - yMin) * Math.random() + yMin;	    
	    }

	    this.initialized = true;

	}
	
	// compute distances from each point to its nearest mean point
	this.updateClusters();
    }

    // update the means to be the centroid of each associated cluster
    this.updateMeans = function () {
	
	// x- and y- coordinates of new means after updating
	let xUpdated = new Array(k).fill(0);
	let yUpdated = new Array(k).fill(0);

	// the number of points in each cluster
	let counts = new Array(k).fill(0);

	// for each point, add its x and y coordinates to the x and y
	// coordinates of its clusster's mean
	for (let i = 0; i < this.xPoints.length; i++) {
	    let j = this.clusters[i];
	    xUpdated[j] += this.xPoints[i];
	    yUpdated[j] += this.yPoints[i];
	    counts[j]++;	    
	}

	// divide each each coordinate by the number of elements to
	// obtain the associated mean
	for (let j = 0; j < k; j++) {
	    if (counts[j] > 0) {
		xUpdated[j] /= counts[j];
		yUpdated[j] /= counts[j];
	    }
	}

	this.xMeans = xUpdated;
	this.yMeans = yUpdated;
    }

    // Update the clusters by associating each point with its nearest
    // mean. Return true if any point's cluster is updated and false
    // otherwise (returning false is the termination condition for the
    // k-means algorithm)
    this.updateClusters = function () {
	let updated = false;
	for (let i = 0; i < this.xPoints.length; i++) {
	    let x = this.xPoints[i];
	    let y = this.yPoints[i];
	    let c = this.clusters[i];

	    // if point i is unassigned, assign it to cluster 0
	    if (c == -1) {
		updated = true;
		this.clusters[i] = 0;
		c = 0;
	    }

	    let p = this.xMeans[c];
	    let q = this.yMeans[c];

	    // the squared distance between (x, y) and (p, q)
	    let dist = (x - p) * (x - p) + (y - q) * (y - q);

	    // update (x, y)'s cluster if a closer mean is found
	    for (let j = 0; j < k; j++) {
		p = this.xMeans[j];
		q = this.yMeans[j];
		if ((x - p) * (x - p) + (y - q) * (y - q) < dist) {
		    dist = (x - p) * (x - p) + (y - q) * (y - q);
		    this.clusters[i] = j;
		    updated = true;
		}
	    }
	}

	return updated;
    }

    // add a point with coordinates (x, y) to the instance and return
    // the index at which the new point is stored
    this.addPoint = function (x, y) {
	this.xPoints.push(x);
	this.yPoints.push(y);
	this.clusters.push(-1);
	return this.xPoints.length - 1;
    }
}

function KMeansVisualizer (svg, kmeans) {
    this.svg = svg;            // svg element displaying everything
    this.kmeans = kmeans;      // KMeans instance
    this.k = this.kmeans.k;    // number of clusters
    this.clusterGroups = [];   // SVG groups for each cluster
    this.pointElts = [];       // SVG elements for each point
    this.meanElts = [];        // SVG elements for each mean
    this.curAnimation = null;  // current animation id

    // create a group for points not yet assigned to a cluster
    this.unassignedGroup = document.createElementNS(SVG_NS, "g");
    this.unassignedGroup.setAttributeNS(null, "fill", "rgb(100, 100, 100)");
    svg.appendChild(this.unassignedGroup);

    // create groups and assign colors for each cluster
    for (let i = 0; i < this.k; i++) {
	let group = document.createElementNS(SVG_NS, "g");
	group.setAttributeNS(null, "fill", `hsl(${60 +  360 * i / this.k}, 90%, ${50 - 20 * i / this.k}%)`);
	svg.appendChild(group);
	this.clusterGroups.push(group);
    }

    this.addPoint = function (x, y) {
	
	let index = this.kmeans.addPoint(x, y);

	const pt = document.createElementNS(SVG_NS, "circle");
	pt.classList.add("dot");
	pt.setAttributeNS(null, "cx", x);
	pt.setAttributeNS(null, "cy", y);
	this.unassignedGroup.appendChild(pt);
	this.pointElts[index] = pt;
    }

    this.updateGroups = function () {
	for (let i = 0; i < this.pointElts.length; i++) {
	    let pt = this.pointElts[i];
	    let group = this.kmeans.clusters[i];
	    this.clusterGroups[group].prepend(pt);
	}
    }

    this.drawMeans = function () {
	
	if (this.meanElts.length > 0) {
	    this.updateMeans();
	    this.updateGroups();
	    return;
	}
	
	for (let i = 0; i < this.k; i++) {
	    let elt = document.createElementNS(SVG_NS, "polygon");
	    elt.setAttributeNS(null, "points", "10,0 0,10 -10,0 0,-10");
	    elt.classList.add('mean-point');

	    // set up animation for means
	    let animate = document.createElementNS(SVG_NS, "animateTransform");
	    animate.setAttributeNS(null, "attributeName", "transform");
	    animate.setAttributeNS(null, "attributeType", "XML");
	    animate.setAttributeNS(null, "type", "translate");
	    animate.setAttributeNS(null, "from", "0 0");
	    animate.setAttributeNS(null, "to", "0 0");
	    animate.setAttributeNS(null, "dur", "1s");
	    animate.setAttributeNS(null, "repeatCount", "1");
	    animate.setAttributeNS(null, "fill", "freeze");
	    animate.setAttributeNS(null, "begin", "indefinite");
	    elt.appendChild(animate);
	    this.meanElts[i] = elt;
	    this.clusterGroups[i].appendChild(elt);
	}
    }

    this.updateMeans = function () {
	for (let i = 0; i < this.k; i++) {
	    let elt = this.meanElts[i];
	    let x = this.kmeans.xMeans[i];
	    let y = this.kmeans.yMeans[i];
	    let animate = elt.firstChild;
	    let from = animate.getAttribute("to");
	    from = (from === "0 0") ? `${x} ${y}` : from;
	    animate.setAttributeNS(null, "from", from);
	    animate.setAttributeNS(null, "to", `${x} ${y}`);
	    animate.beginElement();	    
	}
    }

    this.animate = function () {
	kmeans.initializeMeans();
	vis.drawMeans();
	vis.updateMeans();
	vis.updateGroups();
	this.curAnimation = setInterval(() => {
	    this.animateStep();
	}, 2000);
    }

    this.animateStep = function () {
	this.kmeans.updateMeans();
	this.updateMeans();
	if (this.kmeans.updateClusters()) {
	    this.updateGroups();
	} else {
	    this.stopAnimation();
	}
    }

    this.stopAnimation = function () {
	clearInterval(this.curAnimation);
	this.curAnimation = null;
    }

    svg.addEventListener("click", (e) => {
	const rect = this.svg.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	this.addPoint(x, y);
    });
}


const k = 3;
const kmeans = new KMeans(k);
const svg = document.querySelector("#k-means");
const vis = new KMeansVisualizer(svg, kmeans);

function addRectangularCluster (vis, xMin, yMin, width, height, nPoints) {
    for (let i = 0; i < nPoints; i++) {
	let x = Math.floor(width * Math.random() + xMin);
	let y = Math.floor(height * Math.random() + yMin);
	vis.addPoint(x, y);
    }
}

function randomRectangle (vis, svg) {
    const bound = svg.getBoundingClientRect();
    const xMin = bound.left;
    const yMin = bound.top;
    const width = bound.width;
    const height = bound.height;

    let boxXMin = xMin + Math.floor(width * Math.random() * 3 / 4);
    let boxYMin = yMin + Math.floor(height * Math.random() * 3 / 4);
    let boxWidth = Math.floor(width / 8 + width * Math.random() / 4);
    let boxHeight = Math.floor(height / 8 + height * Math.random() / 4);
    boxWidth = Math.min(boxWidth, width + xMin - boxXMin);
    boxHeight = Math.min(boxHeight, height + yMin - boxYMin);

    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "x", boxXMin);
    rect.setAttributeNS(null, "y", boxYMin);
    rect.setAttributeNS(null, "width", boxWidth);
    rect.setAttributeNS(null, "height", boxHeight);
    rect.classList.add("bounding-box");
    svg.prepend(rect);

    addRectangularCluster (vis, boxXMin, boxYMin, boxWidth, boxHeight, 40);
}

const btnInitialize = document.querySelector("#btn-initialize");
btnInitialize.addEventListener("click", () => {
    kmeans.initializeMeans();
    vis.drawMeans();
    vis.updateMeans();
    vis.updateGroups();
});

const btnUpdateMeans = document.querySelector("#btn-update-means");
btnUpdateMeans.addEventListener("click", () => {
    kmeans.updateMeans();
    vis.updateMeans();
});

const btnUpdateClusters = document.querySelector("#btn-update-clusters");
btnUpdateClusters.addEventListener("click", () => {
    kmeans.updateClusters();
    vis.updateGroups();
});

const btnAnimate = document.querySelector("#btn-animate");
btnAnimate.addEventListener("click", () => {
    vis.animate();
});

const btnAddCluster = document.querySelector("#btn-add-cluster");
btnAddCluster.addEventListener("click", () => {
    randomRectangle(vis, svg);
});

const btnHideBoxes = document.querySelector("#btn-hide-boxes");
btnHideBoxes.addEventListener("click", () => {
    for (let box of document.querySelectorAll(".bounding-box")) {
	box.classList.toggle("hidden");
    }
});
