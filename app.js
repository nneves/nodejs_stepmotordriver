var stepmotor = require('./a4983.js');
stepmotor.initialize();

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('WS: %s', message);
        var jsonobject = JSON.parse(message);
        motorRemoteControl(jsonobject);
    });
    //ws.send('');
});


//stepmotor.step();
function motorRemoteControl(jsonobject) {
	if(jsonobject.cmd === "step")
		stepmotor.step();
	else if(jsonobject.cmd === "start")
		stepmotor.start();
	else if(jsonobject.cmd === "stop")
		stepmotor.stop();
};