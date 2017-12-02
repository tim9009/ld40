////////////////////////////// GAME VARIABLES //////////////////////////////
var gameData = {
	mapData: null,
	mapObjects: {},
};

var gameState = {
	gameStarted: false,
};

Vroom.mainUpdateLoopExtension = function() {
};

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

loadJSON('map/test.json', function(data) {
	gameData.mapData = data;
});

function initMap() {
	console.log('Inititating map.');
	if(gameData.mapData) {
		console.log('Map data found.');
		for (var layer in gameData.mapData.layers) {
			console.log('Loading layer: ' + layer);
			console.log(gameData.mapData.layers[layer]);
			for (var i in gameData.mapData.layers[layer].data) {
				var tileNumber = gameData.mapData.layers[layer].data[i];
				console.log('Parsing tile with tileNumber: ' + tileNumber);
				
				if(tileNumber !== 0) {
					var row = Math.floor(i / gameData.mapData.layers[layer].width);
					var col = i % gameData.mapData.layers[layer].width;

					var dim = {
						width: gameData.mapData.tilewidth,
						height: gameData.mapData.tileheight,
					};

					var pos = {
						x: col * dim.width,
						y: row * dim.height,
					};

					var tile = new Tile(dim, pos, layer, tileNumber);
					gameData.mapObjects[tile._id] = tile;
				}
			}
		}
	}
}

function registerMap() {
	for(var tile in gameData.mapObjects) {
		Vroom.registerEntity(gameData.mapObjects[tile]);
	}
}

function deregisterMap() {
	for(var tile in gameData.mapObjects) {
		Vroom.deregisterEntity(tile);
	}
}