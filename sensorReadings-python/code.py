# This is circuitpython
# Circuit Playground Express Data Time/Light Intensity/Temperature
# Log data to a CSV on-screen
# Open CSV file beforehand and position (make sure it's empty)
# Use slide switch to start and stop sensor readings
# Time values are seconds since board powered on (relative time)

import time
from digitalio import DigitalInOut, Direction, Pull
import analogio
import board
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import adafruit_thermistor

# Switch to quickly enable/disable
switch = DigitalInOut(board.SLIDE_SWITCH)
switch.pull = Pull.UP

# light level
light = analogio.AnalogIn(board.LIGHT)
# temperature
thermistor = adafruit_thermistor.Thermistor(board.TEMPERATURE, 10000,
                                            10000, 25, 3950)

# Set the keyboard object!
# Sleep for a bit to avoid a race condition on some systems
time.sleep(1)
kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)  # US is only current option...

led = DigitalInOut(board.D13)   # Set up red LED "D13"
led.direction = Direction.OUTPUT

def slow_write(string):   # Typing should not be too fast for
    for c in string:      # the computer to be able to accept
        layout.write(c)
        time.sleep(0.2)   # use 1/5 second pause between characters

while True:
    if switch.value:    # If the slide switch is off, don't log
        continue

    # Turn on the LED to show we're logging
    led.value = True
    temp = thermistor.temperature  # In Celsius
    # if you want Fahrenheit, uncomment the line below
    # temp = temp * 9 / 5 + 32
    # Format data into value 'obj_output'
    obj_output = "{},{},{}".format(time.time(), light.value, temp)
    slow_write(obj_output + "\n")   # print to csv file

    kbd.press(Keycode.DOWN_ARROW)  # Code to go to next row
    time.sleep(0.01)
    kbd.release_all()
    for _ in range(3):
        time.sleep(0.015)
        kbd.release_all()
        time.sleep(0.025)  # Wait a bit more for Google Sheets

    led.value = False
    # Change 0.1 to whatever time you need between readings
    time.sleep(1.0)