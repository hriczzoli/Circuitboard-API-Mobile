![circuitborad](circuit_playground_express.jpg)

https://www.adafruit.com/product/3333

# This is circuitpython running on the board (in code.py)
 Circuit Playground Express - Data Time/Light Intensity/Temperature

 Log data to a CSV on-screen

 Open CSV file beforehand
 
 Use slide switch to start and stop sensor readings

 Time values are seconds since board powered on (relative time that's why we change that value with the python script in 'convertCSVtoJSON.py' when making JSON file)

 The circuitpython file running on the device is based on a tutorial that can be found on Adafruit's website - it has been tailored to my specific setup though so obviously needed to make changes

 1. Plug in circuitboard to your laptop
 2. Load the script on the board
 3. Open CSV file
 4. Turn on device (D7 slide switch)