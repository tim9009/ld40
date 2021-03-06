////////////////////////////// INIT //////////////////////////////
Vroom.init({
	dim: {
		width: 576,
		height: 324,
	},
	fps: 60,
	inputPreventDefault: [32, 17, 37, 38, 39, 40],
	backgroundColor: '#000',
	physics: {
		physicsEnabled: true,
		gravityEnabled: true,
		gravity: {
			x: 0,
			y: 0,
		},
		friction: {
			x: 0.999,
			y: 0.999,
		},
	},
});