// Constructor
function Tile(dim, destDim, pos, layer, tileNumber) {
	// Extend VroomEntity
	VroomEntity.call(this, true, VroomEntity.STATIC, VroomEntity.DISPLACE);
	
	this.layer = layer;
	this.tileNumber = tileNumber;

	this.dim = dim;
	this.destDim = destDim;
	this.updateBounds();

	this.pos = pos;

	this.init();
}

// Set correct prototype and costructor
Tile.prototype = Object.create(VroomEntity.prototype);
Tile.prototype.constructor = Tile;

// Init function
Tile.prototype.init = function() {
	
};

// Update function. Handles all logic for objects related to this class.
Tile.prototype.update = function(step) {

};

// Render function. Draws all elements related to this module to screen.
Tile.prototype.render = function(camera) {
	var relativePos = {
		x: this.pos.x - camera.pos.x,
		y: this.pos.y - camera.pos.y,
	};

	// Vroom.ctx.fillStyle = 'gray';
	// Vroom.ctx.fillText(this.tileNumber, relativePosX, relativePosY);
	// Vroom.ctx.fillRect(relativePosX, relativePosY, this.dim.width, this.dim.height);
	mapTileSheet.frameIndex = this.tileNumber - 1;
	mapTileSheet.render(relativePos, this.dim, this.destDim);
};