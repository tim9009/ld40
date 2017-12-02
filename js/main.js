////////////////////////////// GAME VARIABLES //////////////////////////////
var gameData = {
	mapData: null,
	mapObjects: {},
};

var gameState = {
	gameStarted: false,
};

Vroom.mainUpdateLoopExtension = function() {
};

function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
}


// Get map file
loadJSON('map/map_data.json', function(data) {
	gameData.mapData = data;
});