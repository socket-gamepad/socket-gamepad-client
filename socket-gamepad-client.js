//maps buttons/analog input to their respective functions
var map = {};


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
	io.emit('gameclientjoin', {room: roomId});
}


//sets up inputs and callbacks as per user discretion
function forInput(input, callback){
	map[input] = callback;
	
	io.on('sendinput', function(input){
		console.log(input);
		
		for(control in input.control){
			if(input[control] != 0){
				map[input.control](input.value);
			}
		}
		
	});

}

