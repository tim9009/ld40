var mapTileSheet = new VroomSprite('map/tile_sheet.png', false, 0, 32, 32, 2, 0);

function loadMap() {
	initMap();
	console.log('Initiating floor.');
	floor.init();

	console.log('Registering floor.');
	Vroom.registerEntity(floor);

	console.log('Registering map.');
	registerMap();

	console.log('Activating gravity.');
	Vroom.physics.gravity = {
		x: 0,
		y: 0.001,
	};
}

function initMap() {
	console.log('Inititating map.');
	if(gameData.mapData) {
		console.log('Map data found.');
		for (var layer in gameData.mapData.layers) {
			console.log('Loading layer: ' + layer);
			console.log(gameData.mapData.layers[layer]);

			// Tile layers
			if(gameData.mapData.layers[layer].type == 'tilelayer') {
				for (var tileIndex in gameData.mapData.layers[layer].data) {
					var tileNumber = gameData.mapData.layers[layer].data[tileIndex];
					console.log('Parsing tile with tileNumber: ' + tileNumber);
					
					if(tileNumber !== 0) {
						var row = Math.floor(tileIndex / gameData.mapData.layers[layer].width);
						var col = tileIndex % gameData.mapData.layers[layer].width;

						var tileDim = {
							width: gameData.mapData.tilewidth,
							height: gameData.mapData.tileheight,
						};

						var tilePos = {
							x: col * tileDim.width,
							y: row * tileDim.height,
						};

						var tile = new Tile(tileDim, tileDim, tilePos, parseInt(layer, 10), tileNumber);
						gameData.mapObjects[tile._id] = tile;
					}
				}
			} else

			// Object layers
			if(gameData.mapData.layers[layer].type == 'objectgroup') {
				for (var itemIndex in gameData.mapData.layers[layer].objects) {
					var obj = gameData.mapData.layers[layer].objects[itemIndex];
					console.log('Parsing object with id: ' + obj.id);

					var itemDim = {
						width: obj.width,
						height: obj.height,
					};

					var itemPos = {
						x: obj.x,
						y: obj.y,
					};

					var itemType = obj.properties.itemType;
					var sprite = obj.properties.sprite;
					var animated = obj.properties.animated;
					var frames = obj.properties.frames;

					var objEntity = new Item(itemDim, itemDim, itemPos, parseInt(layer, 10), itemType, sprite, animated, frames);
					gameData.mapObjects[objEntity._id] = objEntity;
					console.log(objEntity);
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

// TEMP
var floor = new VroomEntity(true, VroomEntity.STATIC);

floor.init = function() {
	this.layer = 0;
	this.pos = {
		x: -500,
		y: gameData.mapData.height * gameData.mapData.tileheight,
	};
	this.dim = {
		width: gameData.mapData.width * gameData.mapData.tileheight + 500,
		height: 500,
	};

	this.updateBounds();
};

floor.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = "red";
		Vroom.ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);
	}
};