# import packages to read CSV and convert it to JSON
import csv, json, time
from os import stat
from datetime import datetime

csvFilePath = 'SensorReadings.csv'
jsonFilePath = 'SensorReadings.json'
csvNewPath = 'CombinedFile.csv'

# read CSV file
with open(csvNewPath, 'r+') as csvNew:
    # empty file
    csvNew.seek(0)
    csvNew.truncate()
    # write header for CSV file
    header = ["Time", "Light", "Temperature"]
    writer = csv.writer(csvNew)
    writer.writerow(header)

    with open(csvFilePath, 'r+') as csvFile:
        csvReader = csv.reader(csvFile)
        for row in csvReader:
            try:
                writer.writerow(row)
            except Exception as e:
                print(e)
csvNew.close()

# create new json file and write data in it
l = []
with open(csvNewPath, 'r') as csvNew:
    reader = csv.DictReader(csvNew, delimiter=",")
    with open(jsonFilePath, 'r+') as jsonFile:
        # get current values in JSON file
        data = json.load(jsonFile) if stat(jsonFilePath).st_size != 0 else []
        #  read CSV file and update value for 'Time' key in every row with current DateTime
        for line in reader:
            line = dict(line)
            t = line.get("Time")
            modified_t = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            time_dict = {"Time" : modified_t}
            line.update(time_dict)
            l.append(line)
        try:
            # append new readings from circuit board sensors to existing data
            data.extend(l)
            # empty file
            jsonFile.seek(0)
            jsonFile.truncate()
            time.sleep(2)
            # update JSON file with new data
            jsonFile.write(json.dumps(data))
        except Exception as e:
            print(e)
    jsonFile.close()
csvFile.close()
