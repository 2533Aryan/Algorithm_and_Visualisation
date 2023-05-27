// Define display dimensions and options
const displayWidth = window.innerWidth - 350;
const displayHeight = 450;

// Size
const dataSetSize = 250;

// Visulization
const visualizationOptions = {
  rootNode: '#knn',
  width: displayWidth,
  height: displayHeight,
  backgroundColor: 'black',
  circleFill: '#3fe4h2',
  circleStroke: 'white' 
};


// Define types of data points
const dataPointTypes = ['A', 'B'];


// Generate a random integer between min and max values
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Generate random coordinates for an ellipsoid shape
function createRandomEllipsoidCoordinates(width, height, cx, cy) {
  // Generate random values for rho and phi angles
  const rho = Math.sqrt(Math.random()); 
  const phi = Math.random() * Math.PI * 2;
  
  // Generate random x and y values within the specified width and height
  const xRandomOffset = getRandomInt(-width/2, width/2);
  const yRandomOffset = getRandomInt(-height/2, height/2);
  const x = (rho * Math.cos(phi) * width/2) + cx + xRandomOffset;
  const y = (rho * Math.sin(phi) * height/2) + cy + yRandomOffset;
  
  return {x, y};
}


// Generate a dataset with random coordinates for each type of data point
function createRandomData() {
  const ellipsoidOptions = {
    'A': {
      width: displayWidth/3,
      height: displayWidth/3,
      cx: displayWidth/3,
      cy: displayHeight/3
    },
    'B': {
       width: displayWidth/2.5,
       height: displayWidth/2.5,
       cx: displayWidth*0.663, 
       cy: displayHeight*0.66
    }
  };
  
  // Generate random data points for each type and return combined dataset
  const data = Array.from({length: dataSetSize}, () => {
    const type = Math.random() > 0.5 ? dataPointTypes[0] : dataPointTypes[1];
    const {width, height, cx, cy} = ellipsoidOptions[type];
    const {x, y} = createRandomEllipsoidCoordinates(width, height, cx, cy);
    return {x, y, type};
  });
  
  return data;
}


// Generate random data and visualize with k-NN algorithm
const data = createRandomData();
const k = 5;
const visualization = new d3ml.KNNVisualization(data, visualizationOptions, dataPointTypes, k);
visualization.draw();