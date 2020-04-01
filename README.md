# Circuitboard-API-Mobile
A project built with Circuit Playground Express - circuitboard, Node.js - Express, React-Native-Expo

1. Plug-in your Circuit Playground Express board to your computer and open SensorReadings.CSV file - make sure it's empty.
   When you turn on the board, it will start to type out values - Time, Light Sensor Value, Temperature Sensor Value - respectively.
2. Once the device is turned off, run the python script. It will combine values from the first file with a header in CombineFile.CSV and convert it to JSON and write it into SensorReadings.JSON
   (right now, I'm uploading the file to the 'public' folder of the API project and deploy it to Heroku)
3. When running the c_py cross-platform mobile application it fetches data from the API and displays it in a visually more pleasing way.
