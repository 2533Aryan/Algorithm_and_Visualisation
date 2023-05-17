const SVG_NS = "http://www.w3.org/2000/svg";

const PADDING = 50;
const ROW_SEP = 30;
const COL_SEP = 30;

// a class representing a binary tree with a given root
const BinaryTree = function (root) {
    this.root = root;

    // a map storing the depth of each vertex
    this.depths = new Map();
    this.depths.set(root.id, 0);
    this.depth = 0;

    // find a vertex with vtxID that is a descendant of from, or
    // return null if no such vertex is found
    this.find = function (vtxID, from = this.root) {
	if (vtxID === from.id) {
	    return from;
	}

	if (from.left != null) {
	    let left = this.find(vtxID, from.left);
	    if (left != null) {
		return left;
	    }
	}

	if (from.right != null) {
	    let right = this.find(vtxID, from.right);
	    if (right != null) {
		return right;
	    }
	}

	return null;
    }

    // add a left child with id childID to the vertex with id parentID
    this.addLeftChild = function (parentID, childID) {
	let parent = this.find(parentID);
	if (parent == null) {
	    console.log("No node with ID " + parentID + " found. Child not added.");
	    return;
	}
	parent.setLeftChild(new Vertex(childID));
	this.depths.set(childID, this.depths.get(parentID) + 1);
	if (this.depths.get(childID) > this.depth) {
	    this.depth++;
	}
    }

    // add a right child with id childID to the vertex with id parentID
    this.addRightChild = function (parentID, childID) {
	let parent = this.find(parentID);
	if (parent == null) {
	    console.log("No node with ID " + parentID + " found. Child not added.");
	    return;
	}

	parent.setRightChild(new Vertex(childID));
	this.depths.set(childID, this.depths.get(parentID) + 1);
	if (this.depths.get(childID) > this.depth) {
	    this.depth++;
	}	
    }


    // return an array of the tree's vertices in the order of an
    // "in-order" tree traversal
    this.verticesInOrder = function (from = this.root) {
	let vertices = [];

	if (from.left != null) {
	    vertices = this.verticesInOrder(from.left);
	}

	vertices.push(from);

	if (from.right != null) {
	    vertices = vertices.concat(this.verticesInOrder(from.right));
	}

	return vertices;
    }

    // return an array of the tree's vertices in the order of a
    // "pre-order" tree traversal
    this.verticesPreOrder = function (from = this.root) {
	let vertices = [];
	vertices.push(from);

	if (from.left != null) {
	    vertices = vertices.concat(this.verticesPreOrder(from.left));
	}

	if (from.right != null) {
	    vertices = vertices.concat(this.verticesPreOrder(from.right));
	}

	return vertices;
    }
    
    // return an array of the tree's vertices in the order of a
    // "post-order" tree traversal
    this.verticesPostOrder = function (from = this.root) {
	let vertices = [];

	if (from.left != null) {
	    vertices = vertices.concat(this.verticesPostOrder(from.left));
	}

	if (from.right != null) {
	    vertices = vertices.concat(this.verticesPostOrder(from.right));
	}

	vertices.push(from);

	return vertices;
    }

}

// A class representing a Vertex in a BinaryTree. Each Vertex has a
// (unique) ID, parent, left child, and right child. Two vertices with
// identical IDs are considered equal.
const Vertex = function (id) {
    this.id = id;
    this.parent = null;
    this.left = null;
    this.right = null;

    this.equals = function (vtx) {
	return this.id === vtx.id;
    }

    this.toString = function () {
	return this.id;
    }

    this.setLeftChild = function (vtx) {
	this.left = vtx;
	vtx.parent = this;
    }

    this.setRightChild = function (vtx) {
	this.right = vtx;
	vtx.parent = this;
    }
}

const BinaryTreeViewer = function (svg, rootGroup) {
    this.tree = null;
    this.rootGroup = rootGroup;

    // get coordinate bounds from svg
    let coords = svg.getAttribute('viewBox').split(' ').map(Number);
    this.xMin = coords[0];
    this.yMin = coords[1];
    this.width = coords[2];
    this.height = coords[3];

    // x and y coordinates of vertices
    this.xCoords = new Map();
    this.yCoords = new Map();
    
    // SVG elements for vertices and edges
    this.vElts = new Map();
    this.eElts = new Map();

    // possible layouts
    this.layouts = ["random", "greedy", "knuth", "tidy"];
    this.currentLayout = "random";    

    // create svg group for displaying edges
    this.edgeGroup = document.createElementNS(SVG_NS, "g");
    this.edgeGroup.id = "tree-edges";
    this.rootGroup.appendChild(this.edgeGroup);

    // create svg group for displaying vertices
    this.vertexGroup = document.createElementNS(SVG_NS, "g");
    this.vertexGroup.id = "tree-vertices";
    this.rootGroup.appendChild(this.vertexGroup);


    // remove all layout information and remove all SVG elements
    this.clear = function () {
	this.xCoords = new Map();
	this.yCoords = new Map();
	this.vElts = new Map();
	this.eElts = new Map();
	this.edgeGroup.innerHTML = "";
	this.vertexGroup.innerHTML = "";
    }

    // update with a new tree
    this.setTree = function (tree)  {
	this.tree = tree;
	this.clear();
	this.createElements();
	this.setLayout(this.currentLayout);
    }

    // create SVG elements representing this.tree
    this.createElements = function () {
	const vertices = this.tree.verticesInOrder();
	
	// make elements for vertices
	for (let vtx of vertices) {
	    let vElt = document.createElementNS(SVG_NS, "circle");
	    vElt.classList.add("vertex");
	    vElt.setAttributeNS(null, "cx", 0);
	    vElt.setAttributeNS(null, "cy", 0);
	    this.vElts.set(vtx.id, vElt);
	    this.vertexGroup.appendChild(vElt);

	    // make an edge to the left child
	    if (vtx.left != null) {
		let eElt = document.createElementNS(SVG_NS, "line");
		eElt.classList.add("edge");
		this.eElts.set(vtx.id + '-left', eElt);
		this.edgeGroup.appendChild(eElt);
	    }

	    // make an edge to the right child
	    if (vtx.right != null) {
		let eElt = document.createElementNS(SVG_NS, "line");
		eElt.classList.add("edge");
		this.eElts.set(vtx.id + '-right', eElt);
		this.edgeGroup.appendChild(eElt);
	    }
	}
    }

    // set the positions of all node/edge elements according to the
    // current layout
    this.update = function () {
	const vertices = this.tree.verticesInOrder();
	for (let vtx of vertices) {
	    let vElt = this.vElts.get(vtx.id);
	    vElt.setAttributeNS(null, "cx", this.xCoords.get(vtx.id));
	    vElt.setAttributeNS(null, "cy", this.yCoords.get(vtx.id));

	    if (vtx.left != null) {
		let eElt = this.eElts.get(vtx.id + '-left');
		eElt.setAttributeNS(null, "x1", this.xCoords.get(vtx.id));
		eElt.setAttributeNS(null, "y1", this.yCoords.get(vtx.id));
		eElt.setAttributeNS(null, "x2", this.xCoords.get(vtx.left.id));
		eElt.setAttributeNS(null, "y2", this.yCoords.get(vtx.left.id));
	    }

	    if (vtx.right != null) {
		let eElt = this.eElts.get(vtx.id + '-right');
		eElt.setAttributeNS(null, "x1", this.xCoords.get(vtx.id));
		eElt.setAttributeNS(null, "y1", this.yCoords.get(vtx.id));
		eElt.setAttributeNS(null, "x2", this.xCoords.get(vtx.right.id));
		eElt.setAttributeNS(null, "y2", this.yCoords.get(vtx.right.id));
	    }
	}
    }

    // set the layout engine and update the display the default layout
    // is 'random'
    this.setLayout = function (name = this.currentLayout) {
	switch (name) {
	case "random":
	    this.setLayoutRandom();
	    break;
	case "greedy":
	    this.setLayoutGreedy();
	    break;
	case "knuth":
	    this.setLayoutKnuth();
	    break;
	case "tidy":
	    this.setLayoutTidy();
	    break;
	default:
	    console.log("unkown layout '" + name + "' given");
	}
	this.currentLayout = name;
	this.update();
    }

    // set the layout with random positions for the vertices
    this.setLayoutRandom = function () {
	const vertices = this.tree.verticesInOrder();
	for (let vtx of vertices) {
	    this.xCoords.set(vtx.id, Math.floor(Math.random() * (this.width - 2 * PADDING)) + this.xMin + PADDING);
	    this.yCoords.set(vtx.id, Math.floor(Math.random() * (this.height - 2 * PADDING)) + this.yMin + PADDING);
	}
    }

    // set the layout using a greedy positioning procedure
    this.setLayoutGreedy = function () {
	const vertices = this.tree.verticesPreOrder();
	const depths = this.tree.depths;

	// compute the maximum depth of a vertex
	let maxDepth = this.tree.depth;

	// keep trak of the current column at each depth
	const cols = [];
	for (let i = 0; i <= maxDepth; i++) {
	    cols.push(0);
	}

	// iterate over vertices 
	for (let vtx of vertices) {
	    let row = depths.get(vtx.id)
	    let col = cols[row];
	    cols[row]++;

	    this.xCoords.set(vtx.id, PADDING + col * COL_SEP);
	    this.yCoords.set(vtx.id, this.height - PADDING - row * ROW_SEP);
	}
    }

    // set the layout according to Knuth's procedure
    this.setLayoutKnuth = function () {
	const vertices = this.tree.verticesInOrder();
	const depths = this.tree.depths;
	for (let i = 0; i < vertices.length; i++) {
	    let vtx = vertices[i];
	    this.xCoords.set(vtx.id, PADDING + i * COL_SEP);
	    let depth = depths.get(vtx.id);
	    this.yCoords.set(vtx.id, this.height - PADDING - depth * ROW_SEP);
	}
    }

	// set the layout according to Wetherell and Shannon's Tidy Tree
	// procedure
	this.setLayoutTidy = function () {

		// get the root vertex
		let root = this.tree.root;

		// recursively traverse the tree and set the x and y coordinates of each vertex
		this.setLayoutTidyRecursive(root, 250, 200);
	
		// update the positions of all vertices in the SVG elements
		this.update();
	
	}
	
	// recursively traverse the tree and set the x and y coordinates of each vertex
	this.setLayoutTidyRecursive = function (vtx, x, y) {
	
		// set the x and y coordinates of the current vertex
		this.xCoords.set(vtx.id, x);
		this.yCoords.set(vtx.id, y);
	
		// if the current vertex has a left child
		if (vtx.left != null) {
			// recursively traverse the left subtree
			this.setLayoutTidyRecursive(vtx.left, x - ROW_SEP, y + COL_SEP);
		}
	
		// if the current vertex has a right child
		if (vtx.right != null) {
			// recursively traverse the right subtree
			this.setLayoutTidyRecursive(vtx.right, x + ROW_SEP, y + COL_SEP);
		}
	}
		
	// Helper method to calculate the label width of a vertex
	this.getLabelWidth = function (vtx) {
		const vElt = this.vElts.get(vtx.id);
		const label = vtx.toString();
		const textElement = document.createElementNS(SVG_NS, 'text');
		textElement.textContent = label;
		this.vertexGroup.appendChild(textElement);
		const labelWidth = textElement.getBBox().width;
		this.vertexGroup.removeChild(textElement);
		return labelWidth;
	}
}


// make and return a random binary tree of a given size
function getRandomTree (size) {
    const bt = new BinaryTree(new Vertex("0"));
    for (let id = 1; id < size; id++) {
	let cur = bt.root;
	let nextDirection = (Math.random() < 0.5) ? "left" : "right";
	let next = (nextDirection == "left") ? cur.left : cur.right;
	while (next != null) {
	    cur = next;
	    nextDirection = (Math.random() < 0.5) ? "left" : "right";
	    next = (nextDirection == "left") ? cur.left : cur.right;
	}
	if (nextDirection == "left") {
	    bt.addLeftChild(cur.id, id.toString());
	} else {
	    bt.addRightChild(cur.id, id.toString());
	}
    }

    return bt;
}

function getNotGreatTree (size) {
    const bt = new BinaryTree(new Vertex('0'));
    bt.addLeftChild('0', '1');
    bt.addLeftChild('1', '2');
    bt.addRightChild('0', '3');
    for (let id = 4; id < size; id++) {
	bt.addLeftChild((id-1).toString(), id.toString());
    }

    return bt;
}

function getBadTree (size) {
    const bt = new BinaryTree(new Vertex('0'));
    for (let id = 1; id < size; id++) {
	if (id % 2 == 0) {
	    bt.addRightChild((id-1).toString(), id.toString());
	} else {
	    bt.addLeftChild((id-1).toString(), id.toString());
	}
    }

    return bt;
}

function getTidyTree () {
    const bt = new BinaryTree(new Vertex('0'));
    bt.addLeftChild('0', '1');
    bt.addRightChild('0', '2');
    bt.addLeftChild('1', '3');
    bt.addRightChild('1', '4');
    bt.addRightChild('2', '5');
    bt.addLeftChild('4', '6');
    bt.addRightChild('4', '7');
    bt.addRightChild('5', '8');
    bt.addLeftChild('8', '9');
    bt.addLeftChild('9', '10');
    bt.addRightChild('9', '11');
    bt.addLeftChild('10', '12');
    bt.addRightChild('10', '13');
    return bt;
}

const btv = new BinaryTreeViewer(document.querySelector("#tree-box"),
				 document.querySelector("#root-group"));
btv.setTree(getRandomTree(17));
btv.setLayout("random");

const btnRandomTree = document.querySelector("#btn-random-tree");
btnRandomTree.addEventListener("click", function () {
    btv.setTree(getRandomTree(17));
});

const btnExampleOne = document.querySelector("#btn-example-one");
btnExampleOne.addEventListener("click", function () {
    btv.setTree(getNotGreatTree(12));
});

const btnExampleTwo = document.querySelector("#btn-example-two");
btnExampleTwo.addEventListener("click", function () {
    btv.setTree(getBadTree(12));
});

const btnExampleThree = document.querySelector("#btn-example-three");
btnExampleThree.addEventListener("click", function () {
    btv.setTree(getTidyTree());
});

const btnRandom = document.querySelector("#btn-random-layout");
btnRandom.addEventListener("click", function () {
    btv.setLayout("random");
});

const btnGreedy = document.querySelector("#btn-greedy-layout");
btnGreedy.addEventListener("click", function () {
    btv.setLayout("greedy");
});

const btnKnuth = document.querySelector("#btn-knuth-layout");
btnKnuth.addEventListener("click", function () {
    btv.setLayout("knuth");    
});

const btnTidy = document.querySelector("#btn-tidy-layout");
btnTidy.addEventListener("click", function () {
    btv.setLayout("tidy");    
});
