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




var mainMenu = new VroomEntity(false);

mainMenu.init = function() {
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

	this.currentMenuPage = 'main';
	this.lastKeyPressTime = null;
	this.keyPressInterval = 200;

	Vroom.registerEntity(mainMenu);
};

mainMenu.open = function() {
	this.lastKeyPressTime = new Date();
	this.currentMenuPage = 'main';

	gameState.ui.mainMenuVisible = true;
	gameState.ui.HUDVisible = false;
	gameState.ui.winScreenVisible = false;
	gameState.ui.loseScreenVisible = false;
	resetMapState();
	deregisterMap();
	deleteMapObjects();
};

mainMenu.update = function(step) {
	if(!gameState.ui.mainMenuVisible) {
		return;
	}

	// Check if there is long enough since last key press
	if(new Date() - this.lastKeyPressTime > this.keyPressInterval) {
		var enterPressed = Vroom.isKeyPressed(13);
		var escPressed = Vroom.isKeyPressed(27);
		var onePressed = Vroom.isKeyPressed(49);
		var twoPressed = Vroom.isKeyPressed(50);
		var threePressed = Vroom.isKeyPressed(51);

		if(enterPressed || escPressed || onePressed || twoPressed || threePressed) {
			this.lastKeyPressTime = new Date();
		}
		
		if(escPressed) {
			this.currentMenuPage = 'main';
		}


		if(this.currentMenuPage == 'main') {
			if(onePressed) {
				gameState.ui.mainMenuVisible = false;
				startMapNumber(0);
			}else

			if(twoPressed) {
				this.currentMenuPage = 'mapSelector';
			} else

			if(threePressed) {
				this.currentMenuPage = 'tutorial';
			}
		} else

		if(this.currentMenuPage === 'mapSelector') {
			if(onePressed) {
				gameState.ui.mainMenuVisible = false;
				startMapNumber(0);
			} else

			if(twoPressed) {
				gameState.ui.mainMenuVisible = false;
				startMapNumber(1);
			} else

			if(threePressed) {
				gameState.ui.mainMenuVisible = false;
				startMapNumber(2);
			}
		}
	}
};

mainMenu.render = function(camera) {
	if(!gameState.ui.mainMenuVisible) {
		return;
	}

	// Background
	Vroom.ctx.fillStyle = 'black';
	Vroom.ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);

	// Title
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "40px lcd_solid";

	if(this.currentMenuPage === 'main') {
		Vroom.ctx.fillText('MAIN MENU', 30, 60);
	} else

	if(this.currentMenuPage === 'mapSelector') {
		Vroom.ctx.fillText('CHOOSE A MAP', 30, 60);
	} else

	if(this.currentMenuPage === 'tutorial') {
		Vroom.ctx.fillText('HOW TO PLAY', 30, 60);
	}

	// Body text
	Vroom.ctx.font = "10px lcd_solid";

	Vroom.ctx.fillText('Navigate the menu by pressing the the coresponding number.', 30, 80);
	Vroom.ctx.fillText('ESC brings you back to the main menu.', 30, 95);

	if(this.currentMenuPage === 'main') {
		// First button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 150, 260, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "1" to START GAME', 45, 176);

		// Second button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 200, 260, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "2" to CHOOSE MAP', 45, 226);

		// Third button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 250, 260, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "3" for TUTORIAL', 45, 276);
	} else

	if(this.currentMenuPage === 'mapSelector') {
		// First button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 150, 320, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "1" for the first map.', 45, 176);

		// Second button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 200, 320, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "2" for the second map.', 45, 226);

		// Thrid button
		Vroom.ctx.fillStyle = '#fff';
		Vroom.ctx.font = "15px lcd_solid";
		Vroom.ctx.fillRect(30, 250, 320, 40);
		Vroom.ctx.fillStyle = '#333';
		Vroom.ctx.fillText('< Press "3" for the third map.', 45, 276);
	} else

	if(this.currentMenuPage === 'tutorial') {
		Vroom.ctx.font = "10px lcd_solid";
		Vroom.multilineText('CONTROLS:\n[A] Run left\n[D] Run right\n[W] Jump\n\n[H] Pick up an item\n[J] Pick up an item\n[K] Pick up an item\n[L] Pick up an item\n', {x: 30, y: 130}, 12);
		Vroom.multilineText('Try to get to the EXIT carrying as many ARTIFACTS as\npossible without the DRONE scanning you. Be careful,\nthe more artifacts you carry, the easier it will be\nfor the drone to sense you! Artifacts are also heavy\nand will slow you down! Let go of artifacts while in\nthe air to twrow them.', {x: 30, y: 250}, 12);
	}
};

// Init call
mainMenu.init();





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
	var onePressed = Vroom.isKeyPressed(49);
	var twoPressed = Vroom.isKeyPressed(50);

	if(onePressed) {
		restartMap();
	} else

	if(twoPressed) {
		if(gameData.activeMap + 1 < gameData.maps.length) {
			startMapNumber(gameData.activeMap + 1);
			gameState.ui.winScreenVisible = false;
		} else {
			mainMenu.open();
		}
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
	} else {
		Vroom.ctx.fillText('You managed to get ' + player.carriedItems + '/4 artifacts with you.', 30, 100);
	}

	// Time
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillText('Your time: ' + gameState.mapElapsedTime + ' seconds', 30, 120);

	// Score
	Vroom.ctx.font = "25px lcd_solid";
	Vroom.ctx.fillText('SCORE: ' + gameState.mapScore + ' points', 30, 180);

	var rank = 'Potato';
	if(gameState.mapScore > 1600 && gameState.mapScore < 3000) {
		rank = 'Bronze';
	} else
	if(gameState.mapScore > 3000 && gameState.mapScore < 5000) {
		rank = 'Silver';
	} else
	if(gameState.mapScore > 5000) {
		rank = 'Gold';
	}

	Vroom.ctx.font = "25px lcd_solid";
	Vroom.ctx.fillText('RANK:  ' + rank, 30, 215);

	// Back button
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillRect(30, 250, 255, 40);
	Vroom.ctx.fillStyle = '#333';
	Vroom.ctx.fillText('< Press "1" to restart', 45, 276);

	// Next button
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillRect(300, 250, 250, 40);
	Vroom.ctx.fillStyle = '#333';

	if(gameData.activeMap + 1 < gameData.maps.length) {
		Vroom.ctx.fillText('Press "2" to continue >', 315, 276);
	} else {
		Vroom.ctx.fillText('Press "2" to go to menu >', 315, 276);
	}
};

// Init call
winScreen.init();





var loseScreen = new VroomEntity(false);

loseScreen.init = function() {
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

	Vroom.registerEntity(loseScreen);
};

loseScreen.update = function(step) {
	if(!gameState.ui.loseScreenVisible) {
		return;
	}

	var onePressed = Vroom.isKeyPressed(49);

	if(onePressed) {
		restartMap();
	}
};

loseScreen.render = function(camera) {
	if(!gameState.ui.loseScreenVisible) {
		return;
	}

	// Background
	Vroom.ctx.fillStyle = 'black';
	Vroom.ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);

	// Title
	Vroom.ctx.fillStyle = '#fff';
	Vroom.ctx.font = "40px lcd_solid";
	Vroom.ctx.fillText('FAILURE', 30, 60);

	// Body text
	Vroom.ctx.font = "15px lcd_solid";

	Vroom.ctx.fillText('Better luck next time.', 30, 100);

	// Time
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillText('Your time: ' + gameState.mapElapsedTime + ' seconds', 30, 120);

	// Back button
	Vroom.ctx.font = "15px lcd_solid";
	Vroom.ctx.fillRect(30, 250, 255, 40);
	Vroom.ctx.fillStyle = '#333';
	Vroom.ctx.fillText('< Press "1" to restart', 45, 276);
};

// Init call
loseScreen.init();