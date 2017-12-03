////////////////////////////// START ENGINE //////////////////////////////
function start() {
	Vroom.activateCamera(Vroom.createCamera(0, 0, 1, 'both', 0));
	Vroom.activeCamera.follow(player._id);
	Vroom.activeCamera.lerpPercentage = 0.008;

	// Disable image smooting
	Vroom.ctx.mozImageSmoothingEnabled = false;
	Vroom.ctx.webkitImageSmoothingEnabled = false;
	Vroom.ctx.msImageSmoothingEnabled = false;
	Vroom.ctx.imageSmoothingEnabled = false;

	// Vroooom vrooom!
	Vroom.run();

	gameState.gameStarted = true;
}

start();

// Wait for things to load.
setTimeout(loadMap, 500);
setTimeout(startMap, 800);