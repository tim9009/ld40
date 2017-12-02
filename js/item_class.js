// Constructor
function Item(physicsEnabled, dim, destDim, pos, layer, itemType, sprite, animated, frames) {
	// Extend VroomEntity
	VroomEntity.call(this, physicsEnabled, VroomEntity.DYNAMIC, VroomEntity.DISPLACE);
	
	this.layer = layer;

	this.dim = dim;
	this.destDim = destDim;
	this.updateBounds();

	// Workaround for Tiled bug with objects
	this.pos = {
		x: pos.x,
		y: pos.y - this.dim.height,
	};

	this.itemType = itemType || 'placeholder';
	this.onGround = false;

	if(sprite) {
		this.sprite = new VroomSprite('sprites/' + sprite, animated, 140, this.dim.width, this.dim.height, frames, 0);
	}

	this.init();
}

// Set correct prototype and costructor
Item.prototype = Object.create(VroomEntity.prototype);
Item.prototype.constructor = Item;

// Init function
Item.prototype.init = function() {
	
};

Item.prototype.onCollision = function(target) {
	if(target._id !== player._id &&  target.getTop() >= this.getBottom() - 1 && target.getLeft() < this.getRight() && target.getRight() > this.getLeft()) {
		this.onGround = true;
	}
};

// Update function. Handles all logic for objects related to this class.
Item.prototype.update = function(step) {
	// Reset velocity on touching ground
	if(!this.moving && this.onGround && this.vel.x !== 0) {
		this.vel.x = 0;
	}

	if(this.sprite.animated) {
		this.sprite.update(step);
	}

	this.onGround = false;
};

// Render function. Draws all elements related to this module to screen.
Item.prototype.render = function(camera) {
	var relativePos = {
		x: this.pos.x - camera.pos.x,
		y: this.pos.y - camera.pos.y,
	};

	if(this.itemType === 'placeholder') {
		Vroom.ctx.fillStyle = 'blue';
		Vroom.ctx.fillRect(relativePos.x, relativePos.y, this.dim.width, this.dim.height);
	} else {
		this.sprite.render(relativePos, this.dim, this.destDim);
	}
};