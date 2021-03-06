var Gpio = function (igpioRef, igpioDir) {

	if(!(this instanceof arguments.callee)) {
		console.log("Auto create and return object!");
		return new arguments.callee();
	}

    this.gpioRef = igpioRef;
    this.gpioDir = igpioDir;
    this.val = 0;	// defaults to value 0

    console.log("[*] Create GPIO(%d) object [%s]", this.gpioRef, this.gpioDir);
}

Gpio.prototype.readSync = function () {

	console.log("<-- Getting GPIO(%d) value: %d", this.gpioRef, this.val);

	return this.val;
};

Gpio.prototype.writeSync = function (iVal) {

	this.val = iVal;
	console.log("--> Settting GPIO(%d) value: %d", this.gpioRef, this.val);

	return this;
};

Gpio.prototype.unexport = function () {

	console.log("[X] Unexporting GPIO(%d)", this.gpioRef);

	return this;
};

module.exports = {
	Gpio: Gpio
};
