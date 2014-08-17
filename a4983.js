var gpio = require('native-gpio');


function sample () {

	var gpio22 = new gpio.GPIO(22);

	gpio22.direction(gpio.OUT)
	     .value(gpio.HIGH)
	     .value(gpio.LOW)
	     .value(gpio.HIGH);
};

module.exports = {
	sample : sample
};