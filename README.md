nodejs_stepmotordriver
======================

A Linux Embedded GPIO step motor driver node.js module based on Allegro A4983

### BeableBone Black GPIO mapping ###

```
PIN		-		GPIO		-		StepStick function
P9_L8			GPIO_48				DIR
P9_L12			GPIO_49				STEP
P9_L21			GPIO_20				nSLEEP
P9_R6			GPIO_60				nRESET
P9_R21			GPIO_7				nENABLE
```

NOTE: do not use this module, synchronous call of usleep is blocking node.js process and WS messages will not be processed ... keeping this repository for tracking, should create a dedicated GPIO c/c++ independet module instead!!!