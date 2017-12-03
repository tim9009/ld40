var HUD = new VroomEntity(false);

HUD.init = function() {
	this.layer = 11;

	this.dim = {
		width: Vroom.dim.width,
		height: Vroom.dim.height,
	};

	this.updateBounds();

	this.pos = {
		x: 0,
		y: 0,
	};

	Vroom.registerEntity(HUD);
};

HUD.update = function(step) {
};

HUD.render = function(camera) {
	if(!gameState.ui.HUDVisible) {
		return;
	}

	// Title
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "10px lcd_solid";
	Vroom.ctx.fillText(gameState.mapElapsedTime, this.dim.width - 60, 30);
};

// Init call
HUD.init();





var winScreen = new VroomEntity(false);

winScreen.init = function() {
	this.layer = 10;

	this.dim = {
		width: Vroom.dim.width,
		height: Vroom.dim.height,
	};

	this.updateBounds();

	this.pos = {
		x: 0,
		y: 0,
	};

	Vroom.registerEntity(winScreen);
};

winScreen.update = function(step) {
	if(!gameState.ui.winScreenVisible) {
		return;
	}

	if(Vroom.isKeyPressed(13)) {
		restartMap();
	}
};

winScreen.render = function(camera) {
	if(!gameState.ui.winScreenVisible) {
		return;
	}

	// Background
	Vroom.ctx.fillStyle = 'black';
	Vroom.ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);

	// Title
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "40px lcd_solid";
	if(player.carriedItems > 0) {
		Vroom.ctx.fillText('SUCCESS!', 30, 60);
	} else {
		Vroom.ctx.fillText('SUCCESS?', 30, 60);
	}

	// Body text
	Vroom.ctx.font = "15px lcd_solid";

	if(player.carriedItems === 0) {
		Vroom.ctx.fillText('Sadly, you did not bring any artifacts with you...', 30, 100);
	} else
	if(player.carriedItems === 1) {
		Vroom.ctx.fillText('You managed to get a single artifact with you.', 30, 100);
	} else {
		Vroom.ctx.fillText('You managed to get ' + player.carriedItems + ' artifacts with you.', 30, 100);
	}

	// Time
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillText('Your time: ' + gameState.mapElapsedTime + ' seconds', 30, 120);

	// Score
	Vroom.ctx.font = "25px lcd_solid";
	Vroom.ctx.fillText('SCORE: ' + gameState.mapScore + ' points', 30, 180);

	var rank = 'Potato';
	if(gameState.mapScore > 1800 && gameState.mapScore < 3000) {
		rank = 'Bronze';
	} else
	if(gameState.mapScore > 3000 && gameState.mapScore < 4000) {
		rank = 'Silver';
	} else
	if(gameState.mapScore > 4000) {
		rank = 'Gold';
	}

	Vroom.ctx.font = "25px lcd_solid";
	Vroom.ctx.fillText('RANK:  ' + rank, 30, 215);

	// Back button
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillRect(30, 250, 255, 40);
	Vroom.ctx.fillStyle = '#333';
	Vroom.ctx.fillText('< Press enter to restart', 45, 276);
};

// Init call
winScreen.init();