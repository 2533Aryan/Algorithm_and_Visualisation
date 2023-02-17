// function drawTiles() {
//     const grid = document.getElementById("grid");
//     const numTiles = 100;
//     const colors = generateColors(numTiles);
  
//     for (let i = 0; i < numTiles; i++) {
//       const tile = document.createElement("div");
//       tile.classList.add("tile");
//       tile.style.backgroundColor = colors[i];
//       tile.addEventListener("mouseover", () => {
//         tile.classList.add("hover");
//       });
//       tile.addEventListener("mouseout", () => {
//         tile.classList.remove("hover");
//       });
//       grid.appendChild(tile);
//     }
//   }
  
//   function generateColors(numTiles) {
//     const colors = [];
//     const hue = Math.floor(Math.random() * 360);
//     const saturation = Math.floor(Math.random() * 50) + 50;
//     const lightness = Math.floor(Math.random() * 30) + 60;
//     const hueStep = 360 / numTiles;
  
//     for (let i = 0; i < numTiles; i++) {
//       const h = (hue + i * hueStep) % 360;
//       const s = saturation + i * ((100 - saturation) / numTiles);
//       const l = lightness - i * (lightness / numTiles);
//       colors.push(`hsl(${h},${s}%,${l}%)`);
//     }
  
//     return colors;
//   }
  
//   window.onload = () => {
//     drawTiles();
//   };
  
function drawTiles() {
  const gridSize = 10;
  const tileSize = 50; // pixels
  const tileSpacing = 2; // pixels
  const container = document.querySelector('#grid-container');
  
  // Generate and append tiles to the container
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    container.appendChild(tile);
  }
  
  // Style the tiles
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < tiles.length; i++) {
    const color = generateTileColor(i, gridSize);
    tiles[i].style.backgroundColor = color;
    tiles[i].style.width = tileSize + 'px';
    tiles[i].style.height = tileSize + 'px';
    tiles[i].style.margin = tileSpacing + 'px';
  }
  
  // Add mouse hover effect using CSS
  container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('tile')) {
      event.target.classList.add('tile-hover');
    }
  });
  
  container.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('tile')) {
      event.target.classList.remove('tile-hover');
    }
  });
}

function generateTileColor(tileIndex, gridSize) {
  const hue = tileIndex % gridSize / gridSize * 360;
  const saturation = 50 + Math.floor(tileIndex / gridSize) / gridSize * 50;
  const lightness = 50 + Math.floor(tileIndex / gridSize) / gridSize * 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
