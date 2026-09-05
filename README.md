# Browser Life

A tiny evolving ecosystem that lives entirely in the browser.

The project began as a Terra.js experiment: create critters, track their IDs and behavior, record their lives, and eventually visualize the resulting data. The original prototype is preserved in `static/js/terra-world-creation.js`.

## The revived experiment

The current version is dependency-free JavaScript + Canvas. Each creature inherits genes for:

- **speed** — movement versus metabolic cost
- **sense** — how far it can detect food
- **size** — eating radius versus metabolic cost
- **color** — a visible family trait

Creatures spend energy to live, seek food, reproduce when they have enough energy, pass mutated genes to their children, and eventually die. Over enough generations, the world selects which combinations survive.

### Play with evolution

- Click/tap the world to create a burst of food.
- Change **Food rain** to make the environment abundant or harsh.
- Change **Mutation** to control how quickly descendants diverge.
- Change **Time** to accelerate the experiment.
- Hit **Inject chaos** to introduce a new gene pool.
- Hit **New universe** to start over.

## Why this exists

The original idea was bigger than a visual toy: treat artificial creatures as data-producing organisms, record their histories, and study emergent behavior. A natural next step is to add lineage/history recording and persistent experiments without losing the simple browser-first nature of the project.

## Original research direction

The 2021 prototype planned to combine Terra.js, MongoDB, Python analysis, D3 visualizations, and live controls. The new version deliberately starts smaller: first make the world interesting and alive, then make its history observable.
