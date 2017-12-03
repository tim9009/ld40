var drone = new VroomEntity(true, VroomEntity.STATIC, VroomEntity.NONE);

drone.init = function() {
	this.layer = 1;

	this.dim = {
		width: 128,
		height: 64,
	};

	this.updateBounds();

	this.pos = {
		x: -200,
		y: -200,
	};

	this.vel = {
		x: 0,
		y: 0,
	};

	this.hoverHeight = 120;
	this.speed = 0.05;
	this.scanActive = false;
	this.scanEffectActive = false;
	this.scanSpoolTime = 1000;
	this.scanEffectTime = 2000;
	this.scanStart = null;

	this.playerScanned = false;

	this.sprite = new VroomSprite('sprites/drone.png', false, 0, this.dim.width, this.dim.height, 1, 0);

	Vroom.registerEntity(drone);
};

drone.reset = function() {
	this.scanActive = false;
	this.scanEffectActive = false;
	this.scanStart = null;
	this.playerScanned = false;
};

drone.update = function(step) {
	var targetPos = {
		x: player.pos.x - this.halfDim.width + player.halfDim.width,
		y: player.pos.y - this.hoverHeight,
	};

	var currentSpeed = this.speed * (player.carriedItems + 1);

	if(targetPos.x > this.pos.x) {
		this.pos.x += currentSpeed;
	} else {
		this.pos.x -= currentSpeed;
	}

	if(targetPos.y > this.pos.y) {
		this.pos.y += currentSpeed;
	} else {
		this.pos.y -= currentSpeed;
	}

	// Check if over player
	if(this.getLeft() < player.getLeft() &&
	this.getRight() > player.getRight() &&
	this.getBottom() <= player.getTop()) {
		if(!this.scanActive) {
			this.scanActive = true;
			this.scanStart = new Date();
		}

		if(this.scanEffectActive && !this.playerScanned) {
			this.playerScanned = true;
			setTimeout(function() {
				gameState.mapLose = true;
			}, 1000);
		}
	}

	// Check if a scan has been triggered
	if(this.scanActive) {
		if(this.scanEffectActive) {
			// Check if scan is finished
			if(new Date() - this.scanStart >= this.scanSpoolTime + this.scanEffectTime && !this.playerScanned) {
				// Reset scan
				this.scanActive = false;
				this.scanEffectActive = false;
				this.scanStart = null;
			}
		} else {
			// Check if spool up time is finished
			if(new Date() - this.scanStart >= this.scanSpoolTime) {
				// Activate scan effect
				this.scanEffectActive = true;
			}
		}
	}
};

drone.render = function(camera) {
	var relativePos = {
		x: this.pos.x - camera.pos.x,
		y: this.pos.y - camera.pos.y,
	};


	if(this.scanEffectActive) {
		var beamPos = {
			x: relativePos.x + this.halfDim.width - 50,
			y: relativePos.y + this.halfDim.height,
		};

		Vroom.ctx.fillStyle = Vroom.ctx.createLinearGradient(0, 0, 0, beamPos.y + 100);

		if(this.playerScanned) {
			Vroom.ctx.fillStyle.addColorStop(0, 'rgba(252, 0, 6, 0.8)');
			Vroom.ctx.fillStyle.addColorStop(1, 'rgba(252, 0, 6, 0.2)');

		} else {
			Vroom.ctx.fillStyle.addColorStop(0, 'rgba(30,185,255, 0.8)');
			Vroom.ctx.fillStyle.addColorStop(1, 'rgba(30,185,255, 0.2)');
		}

		Vroom.ctx.fillRect(beamPos.x, beamPos.y, 100, player.pos.y - beamPos.y);
	}

	this.sprite.render(relativePos, this.dim, this.dim);
};

// Init call
drone.init();