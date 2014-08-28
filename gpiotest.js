//var Gpio = require('onoff').Gpio;  // Constructor function for Gpio objects.
var Gpio = require('./emulate-onoff.js').Gpio;  // Constructor function for Gpio objects.
var led1 = new Gpio(48, 'out');    // Export GPIO #48  as an output.
var led2 = new Gpio(49, 'out');    // Export GPIO #49  as an output.
var led3 = new Gpio(20, 'out');    // Export GPIO #10  as an output.
var led4 = new Gpio(60, 'out');    // Export GPIO #60  as an output.

var iv;

// Toggle the state of the LED on GPIO #48 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
iv = setInterval(function() {
    led1.writeSync(led1.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
    led2.writeSync(led2.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
    led3.writeSync(led1.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
    led4.writeSync(led2.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
}, 200);

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    exit();
}, 5000);


function exit() {
    led1.writeSync(0);  // Turn LED off.
    led1.unexport();    // Unexport GPIO and free resources
    led2.writeSync(0);  // Turn LED off.
    led2.unexport();    // Unexport GPIO and free resources
    led3.writeSync(0);  // Turn LED off.
    led3.unexport();    // Unexport GPIO and free resources
    led4.writeSync(0);  // Turn LED off.
    led4.unexport();    // Unexport GPIO and free resources
    process.exit();
}

process.on('SIGINT', exit);
