var socket = io('http://localhost:3000');


//maps input/buttons to their respective functions
var map = {
	buttons: {},
	axes: {}
}
//list of possible types, either buttons os axes
var type = {button : "buttons", axis : "axes"}

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//tl;dr gets the param from url by name
function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ""));
}


//only run once per client
function setupGamepad() {
	var roomId = getParameterByName("vrgamepad");
	socket.emit('gameclientjoined', {room: roomId});
}


//sets up inputs and callbacks as per user discretion
//type maps to HTML5 gamepad object properties
function forInput(type, inputNum, callback){
	map[type][inputNum] = callback;
}

socket.on('gamepad', function(input){
	// console.log(input);
	
	//handles buttons
	for(var i = 0; i < input.buttons.length; i++){
		if(input[i] != 0){
			map.buttons[i](input.buttons[i].value);
		}
	}
	
	//handles axes
	for(var i = 0; i < input.axes.length; i++){
		if(input[i] != 0){
			// map.axes[i](input.axes[i]);
		}
	}
	
	
});

//sets up a callback for what to do when the gamepad disconnects
function onDisconnect(callback){
	socket.on('gamepadleft', function(input){
		callback();
	});
}
