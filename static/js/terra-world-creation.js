// assign array here

terra.registerCreature({
    type: 'firstCreature'
  });


  terra.registerCreature({
    type: 'secondCreature',
    color: [120, 0, 240],
    sustainability: 6,
    reproduceLv: 1
    //console.log(process () )
    //process: function {G}
  },function() {this.id = array.length + 1; 
                array.append.this});// 

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
var ex1 = new terra.Terrarium(50, 50, {id: 'ex1'});
ex1.grid = ex1.makeGridWithDistribution([['secondCreature', 5], ['simplePlant', 95]]);


// export all the creatures = 

//animate enviromnent 
ex1.animate(300);
