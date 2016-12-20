//maps input/buttons to their respective functions
var map = {};
//list of possible types, either buttons os axes
enum type = {button : "buttons", axis : "axes"}

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
	io.emit('gameclientjoined', {room: roomId});
}


//sets up inputs and callbacks as per user discretion
//type maps to HTML5 gamepad object properties
function forInput(type, inputNum, callback){
	map[type][inputNum] = callback;
	
	io.on('sendgamepad', function(input){
		console.log(input);
		
		//handles buttons
		for(var i = 0; i < input.buttons.length; i++){
			if(input[i] != 0){
				map[type.button][i](input.buttons[i].value);
			}
		}
		
		//handles axes
		for(var i = 0; i < input.axes.length; i++){
			if(input[i] != 0){
				map[type.axis][i](input.axes[i]);
			}
		}
		
		
	});
}

//sets up a callback for what to do when the gamepad disconnects
function onDisconnect(callback){
	io.on('gamepadleft', function(input){
		callback();
	});
}
