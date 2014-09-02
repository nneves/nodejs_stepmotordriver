//var Gpio = require('onoff').Gpio;  
var Gpio = require('./emulate-onoff.js').Gpio;

var sleep = require('sleep');

//------------------------------------------------------------------
// setting constants values
//------------------------------------------------------------------
var fDebbug = 1;

var HIGH = 1;
var LOW = 0;
var ON = 1;
var OFF = 0;
var OUT = 'out';
var IN = 'in';
var Clockwise = 1;
var CounterClockwise = 0;

var fAutoStep = 0;		// flag to Enable/Disable auto Step Motor motion, 0 => Disable, 1 => Enable
var fDirection = 0;		// flag for the Step Motor direction, 0 => Normal, 1 => Inverted
var tPulse = 1000000;	// step pulse time in micro-seconds (Step Motor Speed)

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

function debbug(str) {
	if(fDebbug === 1)
		console.log(str);
};

function initialize () {

  // adjust microstepping mode
  //adjust_microstepping_mode(16);

  // initialisation of power stage
  Dir.writeSync(CounterClockwise);
  Step.writeSync(LOW);
  nSleep.writeSync(HIGH);
  nEnable.writeSync(HIGH);
  nReset.writeSync(LOW);

  var initTime = 200000;
  sleep.usleep(initTime);
  nReset.writeSync(HIGH);

  sleep.usleep(initTime);
  nEnable.writeSync(LOW);

  sleep.usleep(initTime);
  Step.writeSync(HIGH);

  sleep.usleep(initTime);
  Step.writeSync(LOW);
  sleep.usleep(initTime);
};

function step() {
	debbug("[a4983.js]:step()");
    Step.writeSync(HIGH);
    sleep.usleep(tPulse);
    Step.writeSync(LOW);
    sleep.usleep(tPulse);

    if(fAutoStep === 1)
    	process.nextTick(step);
    	//process.nextTick(evnt.emmitStep());
};

function start() {
	debbug("[a4983.js]:start()");
	fAutoStep = 1;
	process.nextTick(step);
};

function stop() {
	debbug("[a4983.js]:stop()");
	fAutoStep = 0;
};

function setSpeed(usTime) {
	debbug("[a4983.js]:setSpeed("+usTime.toString()+")");
	tPulse = usTime;
};

function setDirection(iDir) {
	if(iDir === Clockwise){
		debbug("[a4983.js]:setDirection(Clockwise)");
		fDirection = iDir;
		Dir.writeSync(fDirection);
	}
	else if(iDir === CounterClockwise) {
		debbug("[a4983.js]:setDirection(CounterClockwise)");
		fDirection = iDir;
		Dir.writeSync(fDirection);
	}
	else {
		debbug("[a4983.js]:setDirection(???)");
	}
};

module.exports = {
	Clockwise: Clockwise,
	CounterClockwise: CounterClockwise,
	initialize: initialize,
	step: step,
	start: start,
	stop: stop,
	setSpeed: setSpeed,
	setDirection: setDirection
};
