////////////////////////////// INIT //////////////////////////////
Vroom.init({
	dim: {
		width: 1152,
		height: 648,
	},
	fps: 60,
	inputPreventDefault: [32, 17, 37, 38, 39, 40],
	backgroundColor: '#fff',
	physics: {
		physicsEnabled: true,
		gravityEnabled: true,
		gravity: {
			x: 0,
			y: 0.001,
		},
		friction: {
			x: 0.999,
			y: 0.999,
		},
	},
});