
//-- to do list: 
//-- 1. Create "age" statistic
//-- 2. Create "frame" statistic


//-- Welcome. Below is the code to run the simulation. Right now it creates one creature. 
//-- The first one is empty. It can serve as an example untill further development.  


// ------ Start blank  firstCreature. He doesn't do anything.  
terra.registerCreature({
    type: 'firstCreature'
  });
//--------- End of blank firstCreature




//-----------------------------------------------
//------Start of purpleSquare Creature ---------
//----------------------------------------------


//-- This is going to take a while. Keep scrolling....


terra.registerCreature({
    
  //-- Start normal Attributes
    
  type: 'purpleSquare',
    color: [120, 0, 240],
    sustainability: 6, // Amount of food source creatures that need to be around it
    size: 50, // A creature's size; by default, creatures can only eat creatures smaller than them.
    reproduceLv: 1, // Percentage energy needed to reproduce 0-1
    
    // -- End normal Attributes
    
    
    //------ Start "process function" use this to make creature do strange things. 

    process : function (neighbors, x, y) {
    
      this.age+ // Incriment Age by 1   
      
      // ---- use this to print creatur variables to console and eventually to database  
      
      console.log("ID:", this.id, "X:",  x,"Y:", y, "TIME:" ,performance.now(), "AGE:", this.age, "Energy:",this.energy);  


      //-- Start of a whole bunch of gibberish for 20 lines------------- but it's neccesary. 
        //--  It's the stock process function I had to include once I started editing
        //-- the process function. 
      var step = {};
      var maxEnergy = this.maxEnergy;
      if (this.energy > maxEnergy * this.reproduceLv && this.reproduce) {
        step = this.reproduce(neighbors);
      } else if (this.energy > maxEnergy * this.moveLv && this.move) {
        step = this.move(neighbors);
      }
      var creature = step.creature;  
      if (creature) {
        creature.successFn = step.successFn || creature.wait;
        creature.failureFn = step.failureFn || creature.wait;
        return {
          x: step.x,
          y: step.y,
          creature: creature,
          observed: true
        };
      } else return this.energy !== this.maxEnergy
    }
    // ---- End of gibberish     
    
    //---- End of Process Function
  }, 
  //-------------------------------------------------
  //-- Beginning of Constructor function of creature 
  //--------------------------------------------------
  //-- Add Abilities and new functions that will be created at each creature's birth here!  
  function() {

    //-- Start ID
    var ID = function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    };
  this.id = ID()
  //-- End ID

  //-- Start Age 
  var age = 0
  this.age = age 
  //-- End Age
  });


//---------------------------------
 // create a simple plant creature
 //--------------------------------
terra.registerCreature({
  type: 'simplePlant',
  color: [166, 226, 46],
  size: 10,
  reproduceLv: 0.8,
  wait: function() { this.energy += 3; },
  move: false
});


//---------------------------
// initialize our environment
//---------------------------
var ex1 = new terra.Terrarium(25, 25, {id: 'ex1'});
ex1.grid = ex1.makeGridWithDistribution([['purpleSquare', 5], ['simplePlant', 95]]);


//--------------------
// Animate enviromnent. The function is called after the last imation. Here it prints "finished"
//--------------------
ex1.animate(300, function() {console.log("finished")}); 


//-- Create javascript object. var = [] Key to each object is name of individual creature

//-- inside of process function spew out statistics into that object. 

//-- have different process that will grab information 