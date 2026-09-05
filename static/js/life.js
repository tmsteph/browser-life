(() => {
  'use strict';

  const canvas = document.getElementById('world');
  const ctx = canvas.getContext('2d');
  const populationEl = document.getElementById('population');
  const foodEl = document.getElementById('food-count');
  const generationEl = document.getElementById('generation');
  const speedEl = document.getElementById('avg-speed');
  const birthsEl = document.getElementById('births');
  const pauseButton = document.getElementById('pause');
  const resetButton = document.getElementById('reset');
  const chaosButton = document.getElementById('chaos');
  const foodRateInput = document.getElementById('food-rate');
  const mutationInput = document.getElementById('mutation-rate');
  const timeScaleInput = document.getElementById('time-scale');

  let width = 900;
  let height = 560;
  let creatures = [];
  let foods = [];
  let paused = false;
  let birthCount = 0;
  let lastTime = performance.now();
  let foodAccumulator = 0;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const random = (min, max) => min + Math.random() * (max - min);

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(320, rect.width);
    height = Math.max(320, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  class Creature {
    constructor(x, y, genes = {}, generation = 1) {
      this.x = x;
      this.y = y;
      this.angle = random(0, Math.PI * 2);
      this.energy = random(70, 105);
      this.age = 0;
      this.generation = generation;
      this.id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      this.genes = {
        speed: genes.speed ?? random(22, 54),
        sense: genes.sense ?? random(45, 115),
        size: genes.size ?? random(2.5, 5.5),
        hue: genes.hue ?? random(150, 310)
      };
    }

    mutatedChild() {
      const mutation = Number(mutationInput.value);
      const mutate = (value, amount, min, max) => clamp(value * (1 + random(-amount, amount)), min, max);
      const child = new Creature(
        this.x + random(-8, 8),
        this.y + random(-8, 8),
        {
          speed: mutate(this.genes.speed, mutation, 10, 90),
          sense: mutate(this.genes.sense, mutation, 20, 180),
          size: mutate(this.genes.size, mutation, 1.8, 8),
          hue: (this.genes.hue + random(-70, 70) * mutation + 360) % 360
        },
        this.generation + 1
      );
      child.energy = 46;
      return child;
    }

    update(dt) {
      this.age += dt;
      let target = null;
      let nearestDistanceSquared = this.genes.sense * this.genes.sense;

      for (const food of foods) {
        const dx = food.x - this.x;
        const dy = food.y - this.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < nearestDistanceSquared) {
          nearestDistanceSquared = distanceSquared;
          target = food;
        }
      }

      if (target) {
        const desired = Math.atan2(target.y - this.y, target.x - this.x);
        let turn = desired - this.angle;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        this.angle += turn * Math.min(1, dt * 5);
      } else {
        this.angle += random(-0.9, 0.9) * dt;
      }

      const speed = this.genes.speed;
      this.x += Math.cos(this.angle) * speed * dt;
      this.y += Math.sin(this.angle) * speed * dt;

      if (this.x < 0) this.x += width;
      if (this.x > width) this.x -= width;
      if (this.y < 0) this.y += height;
      if (this.y > height) this.y -= height;

      const metabolism = 4 + speed * 0.035 + this.genes.sense * 0.006 + this.genes.size * 0.22;
      this.energy -= metabolism * dt;

      for (let i = foods.length - 1; i >= 0; i -= 1) {
        const food = foods[i];
        const dx = food.x - this.x;
        const dy = food.y - this.y;
        const eatDistance = this.genes.size + food.r + 2;
        if (dx * dx + dy * dy < eatDistance * eatDistance) {
          this.energy = Math.min(145, this.energy + food.energy);
          foods.splice(i, 1);
          break;
        }
      }
    }

    draw() {
      const r = this.genes.size;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.moveTo(r * 1.8, 0);
      ctx.lineTo(-r, r);
      ctx.lineTo(-r * 0.65, 0);
      ctx.lineTo(-r, -r);
      ctx.closePath();
      ctx.fillStyle = `hsl(${this.genes.hue} 82% ${clamp(42 + this.energy * 0.12, 42, 65)}%)`;
      ctx.fill();
      ctx.restore();
    }
  }

  function addFood(count = 1, center = null) {
    for (let i = 0; i < count; i += 1) {
      const spread = center ? 34 : 0;
      foods.push({
        x: center ? clamp(center.x + random(-spread, spread), 0, width) : random(0, width),
        y: center ? clamp(center.y + random(-spread, spread), 0, height) : random(0, height),
        r: random(1.4, 2.8),
        energy: random(18, 30)
      });
    }
  }

  function seedWorld() {
    creatures = [];
    foods = [];
    birthCount = 0;
    foodAccumulator = 0;
    for (let i = 0; i < 42; i += 1) {
      creatures.push(new Creature(random(0, width), random(0, height)));
    }
    addFood(170);
  }

  function injectChaos() {
    const palette = random(0, 360);
    for (let i = 0; i < 14; i += 1) {
      creatures.push(new Creature(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8),
        {
          speed: random(14, 82),
          sense: random(25, 165),
          size: random(2, 7.5),
          hue: (palette + random(-35, 35) + 360) % 360
        }
      ));
    }
    addFood(55);
  }

  function update(dt) {
    const timeScale = Number(timeScaleInput.value);
    dt *= timeScale;

    foodAccumulator += dt * Number(foodRateInput.value) * 6;
    while (foodAccumulator >= 1) {
      addFood(1);
      foodAccumulator -= 1;
    }
    if (foods.length > 500) foods.splice(0, foods.length - 500);

    const newborns = [];
    for (const creature of creatures) {
      creature.update(dt);
      if (creature.energy > 112 && creatures.length + newborns.length < 350) {
        creature.energy *= 0.52;
        newborns.push(creature.mutatedChild());
        birthCount += 1;
      }
    }

    creatures = creatures.filter((creature) => creature.energy > 0 && creature.age < 150);
    creatures.push(...newborns);

    if (creatures.length === 0) {
      for (let i = 0; i < 8; i += 1) {
        creatures.push(new Creature(random(0, width), random(0, height)));
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const food of foods) {
      ctx.beginPath();
      ctx.arc(food.x, food.y, food.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(129, 255, 171, 0.76)';
      ctx.fill();
    }

    for (const creature of creatures) creature.draw();
  }

  function updateStats() {
    const maxGeneration = creatures.reduce((max, creature) => Math.max(max, creature.generation), 1);
    const averageSpeed = creatures.length
      ? creatures.reduce((sum, creature) => sum + creature.genes.speed, 0) / creatures.length
      : 0;

    populationEl.textContent = creatures.length;
    foodEl.textContent = foods.length;
    generationEl.textContent = maxGeneration;
    speedEl.textContent = averageSpeed.toFixed(1);
    birthsEl.textContent = birthCount;
  }

  function frame(now) {
    const rawDt = Math.min(0.05, (now - lastTime) / 1000 || 0);
    lastTime = now;
    if (!paused) update(rawDt);
    draw();
    updateStats();
    requestAnimationFrame(frame);
  }

  pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.textContent = paused ? 'Resume' : 'Pause';
    pauseButton.setAttribute('aria-pressed', String(paused));
  });

  resetButton.addEventListener('click', seedWorld);
  chaosButton.addEventListener('click', injectChaos);

  canvas.addEventListener('pointerdown', (event) => {
    const rect = canvas.getBoundingClientRect();
    addFood(18, { x: event.clientX - rect.left, y: event.clientY - rect.top });
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  seedWorld();
  requestAnimationFrame(frame);
})();
