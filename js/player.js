////////////////////////////// PLAYER //////////////////////////////
var player = new VroomEntity(true, VroomEntity.DYNAMIC, VroomEntity.DISPLACE);
player.init = function() {
	this.layer = 2;
	this.pos = {
		x: 100,
		y: 100,
	};
	this.dim = {
		width: 50,
		height: 100,
	};

	this.updateBounds();

	this.friction = {
		x: 0.999,
		y: 0.999,
	};

	this.speed = 0.005;
	this.speedLimit = 0.3;
	this.lastMovementTime = Date.now();
	this.inputTickRate = 20;
	this.moving = false;
	this.onGround = false;
	this.direction = 'right';
	this.stateCache = {
		pos: {
			x: 100,
			y: 100,
		},
		moving: false,
		direction: 'right',
	};

	//this.idleLeftAnimation = new VroomSprite('sprites/player-idle-left.png', true, 200, 12, 24, 24, 0);
	//this.idleRightAnimation = new VroomSprite('sprites/player-idle-right.png', true, 200, 12, 24, 24, 0);
	//this.runningLeftAnimation = new VroomSprite('sprites/player-running-left.png', true, 100, 12, 24, 8, 0);
	//this.runningRightAnimation = new VroomSprite('sprites/player-running-right.png', true, 100, 12, 24, 8, 0);
	//this.activeAnimation = this.idleLeftAnimation;

	// Register player entity
	Vroom.registerEntity(player);
};

player.cachePosition = function() {
	this.stateCache.pos = {
		x: this.pos.x,
		y: this.pos.y,
	};
};

player.handleInput = function(step) {
	tempAccX = 0;
	tempAccY = 0;
	this.moving = false;
	var aPressed = Vroom.isKeyPressed(65);
	var wPressed = Vroom.isKeyPressed(87);
	var dPressed = Vroom.isKeyPressed(68);
	var sPressed = Vroom.isKeyPressed(83);
	var spacePressed = Vroom.isKeyPressed(32);

	// Left
	if(aPressed && !dPressed) {
		tempAccX = -this.speed;
		this.moving = true;
		this.direction = 'left';
	}

	// Up
	if(wPressed && !sPressed) {
		
	}

	// Right
	if(dPressed && !aPressed) {
		tempAccX = this.speed;
		this.moving = true;
		this.direction = 'right';
	}

	// Down
	if(sPressed && !wPressed) {
		
	}

	if(spacePressed && this.onGround) {
		tempAccY = -0.2;
		this.moving = true;
	}

	// Apply movement
	if(this.moving === true) {
		// Lock input to input tick rate
		//if(Date.now() - this.lastMovementTime >= this.inputTickRate) {
			this.acc = {x: tempAccX, y: tempAccY};
			this.lastMovementTime = Date.now();
		//}
	}
};

player.onCollision = function(target) {
	this.onGround = true;
};

player.update = function(step) {
	this.acc = {x: 0, y: 0};
	this.handleInput(step);
	this.cachePosition();

	// Reset velocity on touching ground
	if(!this.moving && this.onGround && this.vel.x !== 0) {
		this.vel.x = 0;
		console.log('RESET');
	}

	// Enforce speed limit
	if(Math.abs(this.vel.x) > this.speedLimit) {
		var xSign = Math.sign(this.vel.x);
		if(xSign == -1 || xSign == -0) {
			this.vel.x = -this.speedLimit;
		} else {
			this.vel.x = this.speedLimit;
		}
	}

	if(Math.abs(this.vel.y) > this.speedLimit) {
		var ySign = Math.sign(this.vel.y);
		if(ySign == -1 || ySign == -0) {
			this.vel.y = -this.speedLimit;
		} else {
			this.vel.y = this.speedLimit;
		}
	}

	// Handle changes in moving state
	if(this.moving !== true) {
		if(this.stateCache.moving === true || this.stateCache.direction !== this.direction) {
			// Set animation based on current direction
			if(this.direction == 'right') {
				this.activeAnimation = this.idleRightAnimation;
			} else {
				this.activeAnimation = this.idleLeftAnimation;
			}

			//this.activeAnimation.reset();
			this.stateCache.moving = false;
		}
	} else {
		if(this.stateCache.moving === false || this.stateCache.direction !== this.direction) {
			// Set animation based on current direction
			if(this.direction == 'right') {
				this.activeAnimation = this.runningRightAnimation;
			} else {
				this.activeAnimation = this.runningLeftAnimation;
			}

			//this.activeAnimation.reset();
			this.stateCache.moving = true;
		}
	}

	// Handle changes in direction state
	if(this.direction !== this.stateCache.direction) {
		this.stateCache.direction = this.direction;
	}

	// Reset onGround state
	this.onGround = false;

	// Update active animation
	//this.activeAnimation.update(step);
};

player.render = function(camera) {
	//this.activeAnimation.render(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
	
	// Hitbox
	Vroom.ctx.beginPath();
	Vroom.ctx.lineWidth = "1";
	Vroom.ctx.moveTo(this.pos.x, this.pos.y);
	Vroom.ctx.strokeStyle = "red";

	Vroom.ctx.rect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.dim.width, this.dim.height);

	Vroom.ctx.stroke();
};

// Initiate player
player.init();