var GPIO = function (igpioRef) {

	if(!(this instanceof arguments.callee)) {
		console.log("Auto create and return object!");
		return new arguments.callee();
	}

    this.gpioRef = igpioRef;
    this.dir = 0; 	// defaults to OUT
    this.val = 0;	// defaults to value 0

    this.HIGH = 1;
	this.LOW = 0;
	this.IN = 1;
	this.OUT = 0;

    console.log("Create GPIO(%d) object", this.gpioRef);
}

GPIO.prototype.direction = function (iDir) {

	this.dir = iDir;

	if(this.dir === this.IN)
		console.log("Settting GPIO(%d) direction: IN", this.gpioRef);
	else if(this.dir === this.OUT)
		console.log("Settting GPIO(%d) direction: OUT", this.gpioRef);
	else
		console.log("Settting GPIO(%d) direction: UNDEFINED", this.gpioRef);

	return this;
};

GPIO.prototype.value = function (iVal) {

	this.val = iVal;
	console.log("Settting GPIO(%d) value: %d", this.gpioRef, this.val);

	return this;
};

module.exports = {
	GPIO: GPIO,
    HIGH: 1,
	LOW: 0,
	IN: 1,
	OUT: 0
};
