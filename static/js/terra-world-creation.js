// Register a basic creature as a placeholder
terra.registerCreature({
    type: 'firstCreature'
});

// Register the 'purpleSquare' creature
terra.registerCreature({
    type: 'purpleSquare',
    color: [120, 0, 240],
    sustainability: 6,
    size: 50,
    reproduceLv: 1,

    // Process function for creature's behavior each cycle
    process: function (neighbors, x, y) {
        this.age++; // Increment age by 1

        // Log creature's statistics
        console.log("ID:", this.id, "X:", x, "Y:", y, "TIME:", performance.now(), "AGE:", this.age, "Energy:", this.energy);

        // Standard process function logic
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
        } else {
            return this.energy !== this.maxEnergy;
        }
    }
}, function () {
    // Constructor function for each new creature instance
    // Generate a unique ID
    this.id = '_' + Math.random().toString(36).substr(2, 9);

    // Initialize age
    this.age = 0;
});

// Register a simple plant creature
terra.registerCreature({
    type: 'simplePlant',
    color: [166, 226, 46],
    size: 10,
    reproduceLv: 0.8,
    wait: function () { this.energy += 3; },
    move: false
});

// Initialize the environment
var ex1 = new terra.Terrarium(25, 25, {id: 'ex1'});
ex1.grid = ex1.makeGridWithDistribution([['purpleSquare', 5], ['simplePlant', 95]]);

// Animate the environment
ex1.animate(300, function () { console.log("finished"); });
