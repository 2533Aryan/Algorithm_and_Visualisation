const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis pellentesque suspendisse tristique in pulvinar erat integer pellentesque nunc viverra auctor semper. Tempus eros ullamcorper mauris turpis lacinia dictumst consequat proin facilisis et conubia curabitur quisque egestas nullam. Nibh erat sodales maecenas quis pulvinar auctor imperdiet platea litora id leo. Per fusce lectus ex cursus urna fusce scelerisque. Dolor tempus augue sit orci elit porttitor ipsum platea erat.";

// width of the text block (in pixels)
const TEXT_WIDTH = 600;

// width of one "em" in pixels for the root element
const em = parseFloat(getComputedStyle(document.querySelector("#root")).fontSize);

// amount by which to indent a paragraph in em
const PARAGRAPH_INDENT = 2;

// ideal separation between words in em
const WORD_SEP = 0.5;

// On input string text, break the text into words, create a span
// element for each word, and return an array of the span elements. It
// is assumed that words are separated by one or more whitespace
// characters.
function getSpanArray (text) {
    const words = text.split(/\s+/);
    const spans = [];
    for (let word of words) {
	let elt = document.createElement("span");
	elt.innerText = word;
	spans.push(elt);
    }

    return spans;
}

// Given an array of spans, compute the widths of the span elements
// and return an array containing the widths. In order for this to
// work, the span elements must be exist in the DOM.
function getSpanWidths (spans) {
    const widths = [];
    for (let s of spans) {
	widths.push(s.getBoundingClientRect().width);
    }

    return widths;
}


// Given an array of spans and a parent element, add the spans as
// descendants of the parent such that the span elements comprise
// separate lines of text. The spans should be added "greedily" so
// that no line exceeds a width of TEXT_WIDTH, but if the next span
// were added, the width of the line would exceed TEXT_WIDTH. In order
// to make the text readable, additional space (WORD_SEP * em) should be added around
// each span element. Adding the space may be easier to accomplish by
// modifying 'style.css', but this method must account for the
// addtional space so that the width of each line does not exceed
// TEXT_WIDTH.
function greedyLines (spans, parent) {
    
}




const root = document.querySelector("#root");
const bigText = document.querySelector("#big-text");
const hidden = document.querySelector("#hidden");
const spans = getSpanArray(TEXT);

for (let s of spans) {
    // root.appendChild(s);
    hidden.appendChild(s);
}

greedyLines(spans, root);
