var entityName = new VroomEntity(false);

// Init function for module. NOTE: default arguments are placeholders and need to be replaced or defined.
entityName.init = function(physicsEnabled, physicsEntityType, physicsCollisionType) {
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

// Render function. Draws all elements related to this module to screen.
entityName.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = 'red';
		Vroom.ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
	}
};

// Init call
entityName.init();