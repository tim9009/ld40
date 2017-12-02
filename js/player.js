////////////////////////////// PLAYER //////////////////////////////
var player = new VroomEntity(true, VroomEntity.DYNAMIC, VroomEntity.DISPLACE);
player.init = function() {
	this.layer = 1;
	this.pos = {
		x: 100,
		y: 100,
	};
	this.dim = {
		width: 32,
		height: 64,
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

	this.carrySlots = [
		{
			item: null,
		},
		{
			item: null,
		},
		{
			item: null,
		},
		{
			item: null,
		},
	];

	this.itemsWithinReach = [];

	this.stateCache = {
		pos: {
			x: 100,
			y: 100,
		},
		moving: false,
		direction: 'right',
	};

	this.idleLeftAnimation = new VroomSprite('sprites/player_idle_left.png', false, 0, 32, 64, 1, 0);
	this.idleRightAnimation = new VroomSprite('sprites/player_idle_right.png', false, 0, 32, 64, 1, 0);
	this.runningLeftAnimation = new VroomSprite('sprites/player_run_left.png', false, 0, 32, 64, 1, 0);
	this.runningRightAnimation = new VroomSprite('sprites/player_run_right.png', true, 100, 32, 64, 6, 0);
	this.activeAnimation = this.idleLeftAnimation;

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
	var hPressed = Vroom.isKeyPressed(72);
	var jPressed = Vroom.isKeyPressed(74);
	var kPressed = Vroom.isKeyPressed(75);
	var lPressed = Vroom.isKeyPressed(76);
	var spacePressed = Vroom.isKeyPressed(32);

	// Left
	if(aPressed && !dPressed) {
		tempAccX = -this.speed;
		this.moving = true;
		this.direction = 'left';
	}

	// Up
	if(wPressed && this.onGround) {
		tempAccY = -0.2;
		this.moving = true;
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

	// Carry slot 1
	if(hPressed) {
		this.pickUpItem(0);
	} else {
		this.dropItem(0);
	}

	// Carry slot 2
	if(jPressed) {
		this.pickUpItem(1);
	} else {
		this.dropItem(1);
	}

	// Carry slot 3
	if(kPressed) {
		this.pickUpItem(2);
	} else {
		this.dropItem(2);
	}

	// Carry slot 4
	if(lPressed) {
		this.pickUpItem(3);
	} else {
		this.dropItem(3);
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

player.pickUpItem = function(slot) {
	if(this.carrySlots[slot].item === null && this.itemsWithinReach.length > 0) {
		console.log('Picking up!');
		// Pick up the first available item
		this.carrySlots[slot].item = this.itemsWithinReach[0];
		this.carrySlots[slot].item.physicsEnabled = false;
		this.itemsWithinReach.splice(0, 1);
	}
};

player.dropItem = function(slot) {
	if(this.carrySlots[slot].item !== null) {
		console.log('Dropping!');
		// Drop the item in a slot
		this.carrySlots[slot].item.physicsEnabled = true;
		this.carrySlots[slot].item = null;
	}
};

player.onCollision = function(target) {
	this.onGround = true;

	if(target instanceof Item) {
		if(target.itemType === 'treasure') {
			this.itemsWithinReach.push(target);
		}
	}
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

			this.activeAnimation.reset();
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

			this.activeAnimation.reset();
			this.stateCache.moving = true;
		}
	}

	// Handle changes in direction state
	if(this.direction !== this.stateCache.direction) {
		this.stateCache.direction = this.direction;
	}

	// Update carried items
	for(var itemIndex in this.carrySlots) {
		if(this.carrySlots[itemIndex].item !== null) {
			this.carrySlots[itemIndex].item.pos.x = this.pos.x + (this.carrySlots[itemIndex].item.dim.width * itemIndex) - 8;
			this.carrySlots[itemIndex].item.pos.y = this.pos.y + 32;
		}
	}

	// Reset collision based state
	this.onGround = false;
	this.itemsWithinReach = [];


	// Update active animation
	if(this.activeAnimation.animated) {
		this.activeAnimation.update(step);
	}
};

player.render = function(camera) {
	var relativePos = {
		x: this.pos.x - camera.pos.x,
		y: this.pos.y - camera.pos.y,
	};

	this.activeAnimation.render(relativePos, this.dim, this.dim);

	// Hitbox
	Vroom.ctx.beginPath();
	Vroom.ctx.lineWidth = "1";
	Vroom.ctx.moveTo(this.pos.x, this.pos.y);
	Vroom.ctx.strokeStyle = "red";

	Vroom.ctx.rect(relativePos.x, relativePos.y, this.dim.width, this.dim.height);

	Vroom.ctx.stroke();
};

// Initiate player
player.init();