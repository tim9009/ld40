var mapTileSheet = new VroomSprite('map/tile_sheet.png', false, 0, 32, 32, 10, 0);

function loadMap() {
	initMap();
	// console.log('Initiating absolute barriers.');
	floor.init();
	leftWall.init();
	rightWall.init();

	// console.log('Registering floor.');
	Vroom.registerEntity(floor);
	Vroom.registerEntity(leftWall);
	Vroom.registerEntity(rightWall);
}

function initMap() {
	// console.log('Inititating map.');
	if(gameData.maps[gameData.activeMap].mapData) {
		var mapData = gameData.maps[gameData.activeMap].mapData;
		// console.log('Map data found.');
		for (var layer in mapData.layers) {
			// console.log('Loading layer: ' + layer);
			// console.log(mapData.layers[layer]);

			// Tile layers
			if(mapData.layers[layer].type == 'tilelayer') {
				for (var tileIndex in mapData.layers[layer].data) {
					var tileNumber = mapData.layers[layer].data[tileIndex];
					// console.log('Parsing tile with tileNumber: ' + tileNumber);
					
					if(tileNumber !== 0) {
						var row = Math.floor(tileIndex / mapData.layers[layer].width);
						var col = tileIndex % mapData.layers[layer].width;

						var tileDim = {
							width: mapData.tilewidth,
							height: mapData.tileheight,
						};

						var tilePos = {
							x: col * tileDim.width,
							y: row * tileDim.height,
						};

						var tile = new Tile(tileDim, tileDim, tilePos, parseInt(layer, 10), tileNumber);
						gameData.maps[gameData.activeMap].mapObjects[tile._id] = tile;
					}
				}
			} else

			// Object layers
			if(mapData.layers[layer].type == 'objectgroup') {
				for (var itemIndex in mapData.layers[layer].objects) {
					var obj = mapData.layers[layer].objects[itemIndex];
					// console.log('Parsing object with id: ' + obj.id);
					if(obj.type == 'player') {
						player.pos.x = obj.x;
						player.pos.y = obj.y - player.dim.height;
						player.layer = parseInt(layer, 10);
					} else

					if(obj.type == 'drone') {
						drone.pos.x = obj.x;
						drone.pos.y = obj.y - drone.dim.height;
						drone.layer = parseInt(layer, 10);
					} else

					if(obj.type == 'trigger') {
						var triggerDim = {
							width: obj.width,
							height: obj.height,
						};

						var triggerPos = {
							x: obj.x,
							y: obj.y,
						};

						var triggerEntity = new Trigger(triggerDim, triggerPos, parseInt(layer, 10), obj.properties.triggerEffect);
						gameData.maps[gameData.activeMap].mapObjects[triggerEntity._id] = triggerEntity;
					} else {

						var itemDim = {
							width: obj.width,
							height: obj.height,
						};

						var itemPos = {
							x: obj.x,
							y: obj.y,
						};

						var sprite = obj.properties.sprite;
						var animated = obj.properties.animated;
						var frames = obj.properties.frames;

						if(typeof obj.properties.physicsEnabled == 'undefined') {
							obj.properties.physicsEnabled = true;
						}

						var itemPhysicsEnabled = obj.properties.physicsEnabled;

						var objEntity = new Item(itemPhysicsEnabled, itemDim, itemDim, itemPos, parseInt(layer, 10), obj.type, sprite, animated, frames);
						gameData.maps[gameData.activeMap].mapObjects[objEntity._id] = objEntity;
						// console.log(objEntity);
					}
				}
			}
		}
	}
}

function registerMap() {
	for(var tile in gameData.maps[gameData.activeMap].mapObjects) {
		Vroom.registerEntity(gameData.maps[gameData.activeMap].mapObjects[tile]);
	}
}

function deregisterMap() {
	for(var tile in gameData.maps[gameData.activeMap].mapObjects) {
		Vroom.deregisterEntity(tile);
	}
}

function deleteMapObjects() {
	gameData.maps[gameData.activeMap].mapObjects = {};
}

// ABSOLUTE WALLS
var floor = new VroomEntity(true, VroomEntity.STATIC);

floor.init = function() {
	var mapData = gameData.maps[gameData.activeMap].mapData;

	this.layer = 0;
	this.dim = {
		width: mapData.width * mapData.tileheight + 1000,
		height: 500,
	};

	this.updateBounds();

	this.pos = {
		x: -500,
		y: mapData.height * mapData.tileheight,
	};
};

floor.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = "#252627";
		Vroom.ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);
	}
};

var leftWall = new VroomEntity(true, VroomEntity.STATIC);

leftWall.init = function() {
	var mapData = gameData.maps[gameData.activeMap].mapData;

	this.layer = 0;
	this.dim = {
		width: 500,
		height: mapData.height * mapData.tileheight + 500,
	};

	this.updateBounds();

	this.pos = {
		x: -this.dim.width,
		y: 0,
	};
};

leftWall.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = "#252627";
		Vroom.ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);
	}
};

var rightWall = new VroomEntity(true, VroomEntity.STATIC);

rightWall.init = function() {
	var mapData = gameData.maps[gameData.activeMap].mapData;

	this.layer = 0;
	this.dim = {
		width: 500,
		height: mapData.height * mapData.tileheight + 500,
	};

	this.updateBounds();

	this.pos = {
		x: mapData.width * mapData.tilewidth,
		y: 0,
	};

};

rightWall.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = "#252627";
		Vroom.ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);
	}
};