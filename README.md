
Research and references: 
https://www.notion.so/Life-in-a-Browser-9060924b7cf9458287ee52f7a78d932a

# Life in a Browser 

1. Use terra.js to create "critters" and have them interact with a virtual environment. 
[https://rileyjshaw.com/terra/](https://rileyjshaw.com/terra/)

2. Keep track of their actions in a Mongo Database to create a database for analysis (population of the different types of critters, plants, how much they eat, etc.).

3. Graph the info about the critters onto a D3 interactive graph. 

4. Create a flask app that auto update critter statistics "live" in real time of the simulation. Show the Critters in the terra.js viewport "living" in real time as the stats about them update in the same page. 

5. include buttons and sliders for changing simulation parameters as well as graphical viewpoints.  

## Detailed Breakdown

### Extract data:

1. give creature "id" method that gives each creature created a unique id 
2. Write creature method that sends x, y, id, and actions of each creature per iteration to Data Base for recording.  
Look into "Process" method
### Analyze and visualize Data:

Run summary statistics of creature types, counts, and locations of creatures per iteration using python to manipulate the data from the mongo database

### Visualize

visualize in d3 with some interactive views.
