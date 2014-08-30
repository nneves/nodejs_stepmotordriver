//var Gpio = require('onoff').Gpio;  
var Gpio = require('./emulate-onoff.js').Gpio;

var sleep = require('sleep');

//------------------------------------------------------------------
// setting constants values
//------------------------------------------------------------------
var HIGH = 1;
var LOW = 0;
var ON = 1;
var OFF = 0;
var OUT = 'out';
var IN = 'in';
var Clockwise = 1;
var CounterClockwise = 0;

var fMotorEnable = 0;		// flag to Enable/Disable Step Motor, 0 => Disable, 1 => Enable
var fMotorDirection = 0;	// flag for the Step Motor direction, 0 => Normal, 1 => Inverted
var kDelay = 1000000;		// delay constant in mili-seconds (Step Motor Speed)

var util = require('util');
var eventemitter = require('events').EventEmitter;

//------------------------------------------------------------------
// Event Emitter
//------------------------------------------------------------------
var EvntClass = function() {

	//var eventemit = EVTClass();
	if(!(this instanceof arguments.callee)) {
		console.log("Create EvntClass and return object!");
		return new arguments.callee();
	}
	console.log("EVTClass object.");
}
util.inherits(EvntClass, eventemitter);

EvntClass.prototype.emmitStep = function () {
	console.log("Event Triggered: Step");
	step();
}

// Initialize Event Emmiter object
var evnt = EvntClass();

//------------------------------------------------------------------
// mapping default values of GPIOs
//------------------------------------------------------------------
var led1 = new Gpio(48, 'out');

var Dir = new Gpio(48, 'out');		// direction of movement
var Step = new Gpio(49, 'out');		// make one step at rising edge
var nSleep = new Gpio(20, 'out');	// must be HIGH to make it work
var nReset = new Gpio(60, 'out'); 	// must be HIGH to make it work
var nEnable = new Gpio(7, 'out');	// must be LOW to make it work
//var MS3 = new Gpio(0, 'out');		// (optional) microstep mode selectors
//var MS2 = new Gpio(0, 'out');
//var MS1 = new Gpio(0, 'out');

//------------------------------------------------------------------

function initialize () {

  // adjust microstepping mode
  //adjust_microstepping_mode(16);

  // initialisation of power stage
  Dir.writeSync(CounterClockwise);
  Step.writeSync(LOW);
  nSleep.writeSync(HIGH);
  nEnable.writeSync(HIGH);
  nReset.writeSync(LOW);

  //wait(0.5);
  nReset.writeSync(HIGH);

  //wait(0.5);
  nEnable.writeSync(LOW);

  //wait(0.5);
  Step.writeSync(HIGH);

  //wait(0.5);
  Step.writeSync(LOW);

  //wait(0.5);
};

function step() {
  
    Step.writeSync(HIGH);
    sleep.usleep(kDelay);
    Step.writeSync(LOW);
    sleep.usleep(kDelay);

    evnt.emmitStep();
};

module.exports = {
	initialize : initialize,
	step: step
};
