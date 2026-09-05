# Browser Life

> **Status: project ancestry / reference.** Active development has graduated into [`tmsteph/3dvr-portal/life-lab`](https://github.com/tmsteph/3dvr-portal/tree/main/life-lab), where the experiment now includes Three.js, live data science, lineage archives, ancestry exploration, and connections to the 3DVR Digital Organism. This repository preserves the smaller Browser Life lineage and original research direction.

A tiny evolving ecosystem that lives entirely in the browser.

The project began as a Terra.js experiment: create critters, track their IDs and behavior, record their lives, and eventually visualize the resulting data. The original prototype is preserved in `static/js/terra-world-creation.js`.

## The revived experiment

The dependency-free JavaScript + Canvas revival gave each creature inheritable genes for:

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

## Where it went next

The larger idea was always more than a visual toy: treat artificial creatures as data-producing organisms, record their histories, and study emergent behavior.

That continuation now lives in **3DVR Life Lab** inside the Portal monorepo. New artificial-life features should normally be built there so simulation, visualization, data science, and the broader 3DVR research environment evolve together.

## Original research direction

The 2021 prototype planned to combine Terra.js, MongoDB, Python analysis, D3 visualizations, and live controls. The revived Browser Life version deliberately started smaller: first make the world interesting and alive, then make its history observable.

Life Lab continues that path while this repository remains a readable record of where it started.
