//var gpio = require('native-gpio');
var gpio = require('./emulate-native-gpio.js');

// setting constants values
var HIGH = gpio.HIGH;
var LOW = gpio.LOW;
var ON = gpio.HIGH;
var OFF = gpio.LOW;
var Clockwise = gpio.LOW;
var CounterClockwise = gpio.HIGH;

// mapping default values of GPIOs
var Dir = new gpio.GPIO(23);		// direction of movement
var Step = new gpio.GPIO(24);		// make one step at rising edge
var nSleep = new gpio.GPIO(25);		// must be HIGH to make it work
var nReset = new gpio.GPIO(26); 	// must be HIGH to make it work
var nEnable = new gpio.GPIO(27);	// must be LOW to make it work
//var MS3 = new gpio.GPIO(19);		// (optional) microstep mode selectors
//var MS2 = new gpio.GPIO(18);
//var MS1 = new gpio.GPIO(17);

Dir.direction(1);
Dir.direction(gpio.OUT);

Step.direction(gpio.OUT);
nSleep.direction(gpio.OUT);
nReset.direction(gpio.OUT);
nEnable.direction(gpio.OUT);
//MS3.direction(gpio.OUT);
//MS2.direction(gpio.OUT);
//MS1.direction(gpio.OUT);

function initialize () {

  // adjust microstepping mode
  //adjust_microstepping_mode(16);

  // initialisation of power stage
  Dir.value(CounterClockwise);
  Step.value(LOW);
  nSleep.value(HIGH);
  nEnable.value(HIGH);
  nReset.value(LOW);

  //wait(0.5);
  nReset.value(HIGH);

  //wait(0.5);
  nEnable.value(LOW);

  //wait(0.5);
  Step.value(HIGH);

  //wait(0.5);
  Step.value(LOW);

  //wait(0.5);
 
  //f_motor_enable = 0;    // flag to Enable/Disable Step Motor, 0 => Disable, 1 => Enable
  //f_motor_direction = 0; // flag for the Step Motor direction, 0 => Normal, 1 => Inverted
  //k_delay = 0.001;       // delay constant in seconds (Step Motor Speed)

};

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