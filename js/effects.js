var vignette = new VroomEntity(false);

// Init function for entity.
vignette.init = function() {
	this.layer = 5;

	this.dim = {
		width: Vroom.dim.width,
		height: Vroom.dim.height,
	};

	this.updateBounds();

	this.pos = {
		x: 0,
		y: 0,
	};

	this.image = new VroomSprite('effects/vignette.png', false, 0, this.dim.width, this.dim.height, 1, 0);

	Vroom.registerEntity(vignette);
};

// Render function. Draws all elements related to this module to screen.
vignette.render = function(camera) {
	this.image.render(this.pos, this.dim, this.dim);
};

// Init call
vignette.init();