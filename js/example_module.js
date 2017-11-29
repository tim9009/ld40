var moduleName = new VroomEntity(false);

// Init function for module. NOTE: default arguments are placeholders and need to be replaced or defined.
moduleName.init = function(physicsEnabled, physicsEntityType, physicsCollisionType) {
	this.layer = 1;

	this.dim = {
		x: 0,
		y: 0,
	};

	this.updateBounds();

	this.pos = {
		x: 0,
		y: 0,
	};

	this.vel = {
		x: 0,
		y: 0,
	};

	this.attributeOne = "Hello World";
};

// Update function. Handles all logic for objects related to this module.
moduleName.update = function(step) {

};

// Render function. Draws all elements related to this module to screen.
moduleName.render = function(camera) {
	Vroom.ctx.fillStyle = 'red';
	Vroom.ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
};

// Init call
moduleName.init();