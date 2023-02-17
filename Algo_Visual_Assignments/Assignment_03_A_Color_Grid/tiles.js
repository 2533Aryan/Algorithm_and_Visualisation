function drawTiles() {
    const grid = document.getElementById("grid");
    const numTiles = 100;
    const colors = generateColors(numTiles);
  
    for (let i = 0; i < numTiles; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.style.backgroundColor = colors[i];
      tile.addEventListener("mouseover", () => {
        tile.classList.add("hover");
      });
      tile.addEventListener("mouseout", () => {
        tile.classList.remove("hover");
      });
      grid.appendChild(tile);
    }
  }
  
  function generateColors(numTiles) {
    const colors = [];
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 30) + 60;
    const hueStep = 360 / numTiles;
  
    for (let i = 0; i < numTiles; i++) {
      const h = (hue + i * hueStep) % 360;
      const s = saturation + i * ((100 - saturation) / numTiles);
      const l = lightness - i * (lightness / numTiles);
      colors.push(`hsl(${h},${s}%,${l}%)`);
    }
  
    return colors;
  }
  
  window.onload = () => {
    drawTiles();
  };
  