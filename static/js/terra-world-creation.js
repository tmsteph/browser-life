

// create new class  

// baseCreature.prototype.id = function (neighbors) {
//   var creature = this;
// // give id
//   var id = 
  
// } 


terra.registerCreature({
    type: 'firstCreature'
  });


  terra.registerCreature({
    type: 'secondCreature',
    color: [120, 0, 240],
    sustainability: 6, // amount of food sources that need to be around it
    reproduceLv: 1
    //process: function {G}
  }, 
  function() {
    var ID = function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    };
  
  this.id = ID()
  console.log(this.id) // printing out ID to console
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
ex1.grid = ex1.makeGridWithDistribution([['secondCreature', 5], ['simplePlant', 95]]);

//Create javascript object. var = [] Key to each object is name of individual creature

// inside of process function spew out statistics into that object. 

// have different process that will grab information 

//animate enviromnent 
ex1.animate(300);
