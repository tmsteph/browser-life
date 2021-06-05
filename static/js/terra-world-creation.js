
// I think this is also a way to create noew creature abilities
// create new class  

// baseCreature.prototype.id = function (neighbors) {
//   var creature = this;
// // give id
//   var id = 
  
// } 

let frameCounter = 0


//// ------ Blank Creature Below
terra.registerCreature({
    type: 'firstCreature'
  });
//-- End of blank Creature

////// ------ Start of Purple Creature 
  terra.registerCreature({
    //-- Attributes
    type: 'purpleSquare',
    color: [120, 0, 240],
    sustainability: 6, // amount of food source creatures that need to be around it
    reproduceLv: 1,
    //- Start of "process function" that describes 'What the creature does'
    process : function (neighbors, x, y) {

 // ---- print stats to console ----- 
      console.log("ID:", this.id, "X:",  x,"Y:", y, "TIME:" ,performance.now());  

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
    
    
    //---- End of Process Function
  }, 

  //-- Beginning of Constructor function of creature 2 
  //-- Add Abilities and new functions that will be created at each creature's birth here!  
  function() {
    var ID = function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    };

  this.id = ID()
  
  });

 // create a simple plant creature
terra.registerCreature({
  type: 'simplePlant',
  color: [166, 226, 46],
  size: 10,
  reproduceLv: 0.8,
  wait: function() { this.energy += 3; },
  move: false
});

// initialize our environment
var ex1 = new terra.Terrarium(25, 25, {id: 'ex1'});
ex1.grid = ex1.makeGridWithDistribution([['purpleSquare', 5], ['simplePlant', 95]]);



//animate enviromnent 
ex1.animate(300, function() {
  frameCounter++;
  console.log("finished")});


//Create javascript object. var = [] Key to each object is name of individual creature

// inside of process function spew out statistics into that object. 

// have different process that will grab information 