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
		//music.play();
	}

	if(gameState.mapActive) {
		// Update elapsed time
		gameState.mapElapsedTime = (new Date() - gameState.mapTimeStart) / 1000;
		// Check if map has been won
		if(gameState.mapWin) {
			gameState.ui.winScreenVisible = true;
			gameState.mapActive = false;
			gameState.mapScore = Math.floor(player.carriedItems * 1000 + (1600 - gameState.mapElapsedTime * 10));
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

	// Check if game should be paused
	if(gameState.ui.winScreenVisible || gameState.ui.loseScreenVisible || gameState.ui.mainMenuVisible) {
		gameState.gameRunning = false;
	}
};

function restartMap() {
	// Reset drone
	drone.reset();

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
	registerMap();

	Vroom.physics.gravity = {
		x: 0,
		y: 0.001,
	};

	gameState.ui.HUDVisible = true;

	gameState.mapTimeStart = new Date();
	gameState.mapElapsedTime = null;
	gameState.mapScore = 0;
	gameState.gameRunning = true;
	gameState.mapActive = true;
	gameState.mapWin = false;
	gameState.mapLose = false;
}

function startMapNumber(mapNumber) {
	gameData.activeMap = mapNumber;
	loadMap();
	setTimeout(startMap, 800);
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
loadJSON('map/map_data.json', function(data) {
	var mapNumber = gameData.maps.length;
	gameData.maps[mapNumber] = {mapData: data};
	gameData.maps[mapNumber].mapObjects = {};
});