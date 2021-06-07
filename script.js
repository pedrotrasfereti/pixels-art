/* Elements */
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const colors = document.getElementsByClassName('color');
const input = document.getElementById('board-size');

/* Buttons */
const clearBtn = document.getElementById('clear-board');
const genNuBtn = document.getElementById('generate-board');

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
  pixelBoard.style.height = `${40 * size}px`;
  pixelBoard.style.width = `${(40 * size) + (2 * size)}px`;

  for (let i = 0; i < size; i += 1) {
    const pixelLine = document.createElement('div');
    pixelLine.style.width = `${parseInt(size, 10) * 42}px`;
    pixelLine.className = 'line';
    pixelBoard.appendChild(pixelLine);

    for (let j = 0; j < size; j += 1) {
      const pixelCell = document.createElement('div');
      pixelCell.className = 'pixel';
      pixelLine.appendChild(pixelCell);
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

// Onload
window.onload = function onload() {
  genBoard(5);
  genPalette();
  selectEvent();
  fillEvent();
};
