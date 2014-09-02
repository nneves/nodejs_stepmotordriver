var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');

ws.on('open', function() {
	var jsonobject = {"cmd": "step"};
	//var jsonobject = {"cmd": "start"};
	//var jsonobject = {"cmd": "stop"};
	var jsonstr = JSON.stringify(jsonobject);
    ws.send(jsonstr);
    ws.close();

    setTimeout( function(){
    	console.log("Sending Start Command");
    	var jsonobject = {"cmd": "start"};
		var jsonstr = JSON.stringify(jsonobject);
	    ws.send(jsonstr);

    }, 1000);

    setTimeout( function(){
    	console.log("Sending Stop Command");
		var jsonobject = {"cmd": "stop"};
		var jsonstr = JSON.stringify(jsonobject);
	    ws.send(jsonstr);

    }, 5000);
});

ws.on('message', function(message) {
    console.log('received: %s', message);
});