/* Elements */
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const colors = document.getElementsByClassName('color');
const input = document.getElementById('board-size');
const previewBox = document.getElementById('preview');
const canvasBox = document.getElementById('canvas');

/* Buttons */
const clearBtn = document.getElementById('clear-board');
const genNuBtn = document.getElementById('generate-board');
const shuffleBtn = document.getElementById('shuffle');
const saveBtn = document.getElementById('save-board');
const closeBtn = document.getElementById('close');

/* Functions */

function randomPalette() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
// This function generates a random color palette
function genPalette() {
  for (let i = 1; i < colors.length; i += 1) {
    colors[i].style.backgroundColor = randomPalette();
  }
}

//Shuffle Palette Event
shuffleBtn.addEventListener('click', genPalette);

// Function
function selectColor(evt) {
  const { target } = evt;
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].classList.remove('selected');
  }
  target.classList.add('selected');
}
// Event Listener
function selectEvent() {
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].addEventListener('click', selectColor);
  }
}

// Function
function fillPixel(evt) {
  const paletteElement = document.querySelector('.selected');
  const selectedColor = getComputedStyle(paletteElement).backgroundColor;
  const { target } = evt;
  target.style.backgroundColor = selectedColor;
}
// Event Listener
function fillEvent() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', fillPixel);
  }
}

// Function
function clearBoard() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}
// Event Listener
clearBtn.addEventListener('click', clearBoard);

// This function generates a board based on the size (line x pixel)
function genBoard(size) {
  for (let i = 0; i < size; i += 1) {
    let newRow = document.createElement('tr');
    pixelBoard.appendChild(newRow);
    for (let j = 0; j < size; j += 1) {
      let newPixel = document.createElement('td')
      newPixel.className = 'pixel';
      newRow.appendChild(newPixel);
    }
  }
  fillEvent();
}

// This function clears the board before generating a new one
function resetBoard() {
  pixelBoard.innerHTML = '';
}

// This function generates a pixel board based on the input value
let size = 5;

function genNuBoard() {
  const value = parseInt(input.value, 10);
  if (value < 5) {
    size = 5;
  } else if (value > 50) {
    size = 50;
  } else if (!value) {
    alert('Board inválido!');
  } else {
    size = value;
  }
  resetBoard();
  genBoard(size);
}
genNuBtn.addEventListener('click', genNuBoard);

// This function displays a box containing a downloadable image
function saveImage() {
  previewBox.style.visibility = 'visible';
  canvasBox.innerHTML = '';
  html2canvas(pixelBoard).then(canvas => {
    canvasBox.appendChild(canvas)
  });
}
saveBtn.addEventListener('click', saveImage);

function close() {
  previewBox.style.visibility = 'hidden';
}
closeBtn.addEventListener('click', close);

// Onload
window.onload = function onload() {
  genBoard(5);
  genPalette();
  selectEvent();
  fillEvent();
};