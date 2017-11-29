////////////////////////////// INIT //////////////////////////////
Vroom.init({
	dim: {
		width: 384,
		height: 216,
	},
	fps: 60,
	inputPreventDefault: [32, 17, 37, 38, 39, 40],
	backgroundColor: '#fff',
});





////////////////////////////// START ENGINE //////////////////////////////
function start() {
	Vroom.activateCamera(Vroom.createCamera(0, 0, 1, 'both', 0.5));

	// Disable image smooting
	Vroom.ctx.mozImageSmoothingEnabled = false;
	Vroom.ctx.webkitImageSmoothingEnabled = false;
	Vroom.ctx.msImageSmoothingEnabled = false;
	Vroom.ctx.imageSmoothingEnabled = false;

	// Vroooom vrooom!
	Vroom.run();

	gameState.gameStarted = true;
}

// Wait for things to load.
//setTimeout(start, 1000);