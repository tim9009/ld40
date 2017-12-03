// Constructor
function Trigger(dim, pos, layer, triggerEffect) {
	// Extend VroomEntity
	VroomEntity.call(this, true, VroomEntity.NONE, VroomEntity.NONE);

	this.layer = layer;
	this.dim = dim;
	this.updateBounds();

	this.pos = pos;

	this.triggerEffect = triggerEffect;

	this.init();
}

// Set correct prototype and costructor
Trigger.prototype = Object.create(VroomEntity.prototype);
Trigger.prototype.constructor = Trigger;

// Init function
Trigger.prototype.init = function() {
};

Trigger.prototype.onCollision = function(target) {
	if(this.triggerEffect == 'win') {
		if(target._id == player._id) {
			gameState.mapWin = true;
		}
	}
};

Trigger.prototype.update = function(step) {

};

// Render function. Draws all elements related to this class to screen.
Trigger.prototype.render = function(camera) {
	/*var relativePos = {
		x: this.pos.x - camera.pos.x,
		y: this.pos.y - camera.pos.y,
	};

	Vroom.ctx.fillStyle = 'red';
	Vroom.ctx.fillRect(relativePos.x, relativePos.y, this.dim.width, this.dim.height);*/
};