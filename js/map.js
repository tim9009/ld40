var box = new VroomEntity(true, VroomEntity.STATIC);

box.init = function() {
	this.layer = 2;
	this.pos = {
		x: 0,
		y: 300,
	};
	this.dim = {
		width: 400,
		height: 50,
	};

	this.updateBounds();

	// Register box entity
	Vroom.registerEntity(box);
};

box.render = function(camera) {
	if(this.insideViewport) {
		Vroom.ctx.fillStyle = "red";
		Vroom.ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);
	}
};

// Initiate box
box.init();
