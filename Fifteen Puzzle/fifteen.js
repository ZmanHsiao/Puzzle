// Name: Zachary Hsiao
// Date: 4/25/18
// Section: CSE 154 AJ
// Javascript file creating the fifteen puzzle. Creates a puzzle of a background image
// with one empty space. Puzzle can be scrambled and completed by swapping positions with the space.

"use strict";
(function() {

	// top and left coordinates of the empty square
	let emptySquare = [300, 300];

	/**
 	* Sets up the page on window load. Includes functions
 	* to create the tiles, set the random button,
 	* and give credit to the image.
 	*/
	window.onload = function() {
		makeTiles();
		imageCred();
		let random = document.getElementById("shuffle-button");
		random.onclick = randomize;
	};

	/**
 	* Helper function to make the tiles with DOM objects. 
 	* Creates the puzzle by creating many divs, then adds
 	* onclick functionality to each div.
 	* Onclick: checks if piece is movable and then calls the 
 	* helper function.
 	*/
	function makeTiles() {
		for (let i = 1; i < 16; i++) {
			let topPos = Math.floor((i - 1) / 4) * 100;
			let leftPos = (i - 1) % 4 * 100;
			let div = document.createElement("div"); 
			let area = document.getElementById("puzzle-area");
			div.innerHTML = i;
			div.classList.add("pieces");
			div.style.top = topPos + "px";
			div.style.left = leftPos + "px";
			div.style.backgroundPosition = -leftPos + "px " + -topPos +"px";
			area.appendChild(div);
			checkHover();
			div.onclick = function() {
				if (this.classList.contains("movable")){
					move(this);
				}
			};
		}
	}

	/**
 	* Checks the board to see which pieces are next to the empty space,
 	* and adds the movable class to the ones that can move.
 	*/
	function checkHover() {
		let tiles = document.querySelectorAll(".pieces");
		for (let i = 0; i < tiles.length; i++){
			let topPos = parseInt(tiles[i].style.top);
			let leftPos = parseInt(tiles[i].style.left);
			if (topPos - 100 == emptySquare[0] && leftPos == emptySquare[1]){
				tiles[i].classList.add("movable");
			} else if (topPos == emptySquare[0] && leftPos + 100 == emptySquare[1]){
				tiles[i].classList.add("movable");
			} else if (topPos + 100 == emptySquare[0] && leftPos == emptySquare[1]){
				tiles[i].classList.add("movable");
			} else if (topPos == emptySquare[0] && leftPos - 100 == emptySquare[1]){
				tiles[i].classList.add("movable");
			} else {
				tiles[i].classList.remove("movable");
			}
		}
	}

	/**
 	* Switches the movable piece with the empty spot. Changes
 	* empty spot position to previous moved piece position.
 	*/
	function move(tile) {
		let newSquare = [parseInt(tile.style.top), parseInt(tile.style.left)];
		tile.style.top = emptySquare[0] + "px";
		tile.style.left = emptySquare[1] + "px";
		emptySquare = newSquare;
		checkHover();
	}

	/**
 	* Randomizes the board pieces into a solvable puzzle.
 	*/
	function randomize() {
		for (let i = 0; i < 1000; i++) {
			let movable = document.querySelectorAll(".movable");
			let chosen = Math.floor(Math.random() * movable.length);
			move(movable[chosen]);
		}
	}

	/**
 	* Adds innerHTML to cite the source of the background image of the puzzle.
 	*/
	function imageCred() {
		document.getElementById("copyright-info").innerHTML = "from https://i.pinimg.com/originals/af/be/89/afbe89450517067d63a4b19a9d86b1b6.jpg";
	}
})();