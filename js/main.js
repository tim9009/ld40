////////////////////////////// GAME VARIABLES //////////////////////////////
var gameData = {
	maps: [],
	activeMap: 0,
};

var gameState = {
	gameStarted: false,
	gameRunning: false,
	mapActive: false,
	mapTimeStart: null,
	mapElapsedTime: null,
	mapScore: 0,
	mapWin: false,
	mapLose: false,
	ui: {
		HUDVisible: false,
		mainMenuVisible: true,
		winScreenVisible: false,
		loseScreenVisible: false,
	},
};

var music = new VroomSound('sounds/music.wav');
music.loadBuffer();
music.gain = 1;

Vroom.mainUpdateLoopExtension = function() {
	// Play music
	if(!music.playing) {
		music.play();
	}

	// Check win/lose conditions
	if(gameState.mapActive) {
		// Update elapsed time
		gameState.mapElapsedTime = (new Date() - gameState.mapTimeStart) / 1000;
		// Check if map has been won
		if(gameState.mapWin) {
			gameState.ui.winScreenVisible = true;
			gameState.mapActive = false;
			gameState.mapScore = Math.floor(player.carriedItems * 1000 + (2200 - gameState.mapElapsedTime * 10));
			drone.stopAllSounds();
			player.stopAllSounds();
		}

		// Check if map has been lost
		if(gameState.mapLose) {
			gameState.ui.loseScreenVisible = true;
			gameState.mapActive = false;
			gameState.mapScore = 0;
		}
	}

	//Check for key presses
	if(!gameState.ui.mainMenuVisible) {
		var escPressed = Vroom.isKeyPressed(27);
		
		if(escPressed) {
			mainMenu.open();
		}
	}

	// Check if game should be paused
	if(gameState.ui.winScreenVisible || gameState.ui.loseScreenVisible || gameState.ui.mainMenuVisible) {
		gameState.gameRunning = false;
	}
};

function resetMapState() {
	gameState.mapTimeStart = new Date();
	gameState.mapElapsedTime = null;
	gameState.mapScore = 0;
	gameState.gameRunning = false;
	gameState.mapActive = false;
	gameState.mapWin = false;
	gameState.mapLose = false;
}

function restartMap() {
	// Reset characters
	drone.reset();
	player.reset();

	// Reset map and characters
	deregisterMap();
	deleteMapObjects();
	loadMap();

	// Reset UI
	gameState.ui.winScreenVisible = false;
	gameState.ui.loseScreenVisible = false;

	startMap();
}

function startMap() {
	// Reset characters
	drone.reset();
	player.reset();

	registerMap();

	Vroom.physics.gravity = {
		x: 0,
		y: 0.001,
	};

	gameState.ui.HUDVisible = true;
	gameState.ui.winScreenVisible = false;
	gameState.ui.loseScreenVisible = false;
	gameState.ui.mainMenuVisible = false;

	resetMapState();

	gameState.gameRunning = true;
	gameState.mapActive = true;
}

function startMapNumber(mapNumber) {
	// Reset characters
	drone.reset();
	player.reset();
	
	deregisterMap();
	deleteMapObjects();
	gameData.activeMap = mapNumber;
	loadMap();
	setTimeout(startMap, 500);
}

function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
}


// Get map file
loadJSON('map/map_1_data.json', function(data) {
	var mapNumber = 0;
	gameData.maps[mapNumber] = {mapData: data};
	gameData.maps[mapNumber].mapObjects = {};
});

loadJSON('map/map_2_data.json', function(data) {
	var mapNumber = 1;
	gameData.maps[mapNumber] = {mapData: data};
	gameData.maps[mapNumber].mapObjects = {};
});

loadJSON('map/map_3_data.json', function(data) {
	var mapNumber = 2;
	gameData.maps[mapNumber] = {mapData: data};
	gameData.maps[mapNumber].mapObjects = {};
});