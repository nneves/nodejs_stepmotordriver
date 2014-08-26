var tDutyCycle = 1000;
var counter = 0;

var timer = setInterval(timerCallback, tDutyCycle);

function timerCallback () {
	console.log("Hello World: %d\n", counter++);
	if(counter % 10 === 0) {
		clearTimeout(timer);
		tDutyCycle = tDutyCycle - 100;
		if(tDutyCycle >)

	}
};