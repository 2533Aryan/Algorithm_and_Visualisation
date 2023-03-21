const ns = "http://www.w3.org/2000/svg";

const box = document.querySelector("#dot-box");
box.addEventListener("click", drawDot);

function drawDot(e) {
    console.log("you drew a dot!");

    /* complete this */
    const para = document.querySelector(".text-box");
    para.innerHTML = para.innerHTML + "you clicked the box!<br/>"

}


// function drawDot(e) {
//     let rect = box.getBoundingClientRect();
//     let x = e.clientpX - rect.left;
//     let y = e.clientY - rect.top;
//     // console.log("Clicked: " + x + ", " + y);
//     let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     dot.setAttributeNS(null, "cx", x);
//     dot.setAttributeNS(null, "cy", y);
//     dot.classList.add("dot");
//     box.appendChild(dot);
    
// }
