# Crosscut
[Live Site](https://tkoh13.github.io/Crosscut/#)
## Overview 

Crosscut, at it's core is a visualizer for pathfinding algorithms. Users are able to create mazes and move elements around to watch the different algorithms traverse the graph. 

## Functionality and MVPs

- Select from different algorithms
- Draw or generate the maze
- Move the start or target nodes 

## Algorithms

- Dijkstra's Algorithm: guarantees the shortest path
```javascript
const dijkstras = (graph) => {
    const { nodes } = graph;
    let distance = {};

    for (let node in nodes) {
        distance[node] = Infinity;
    }
    distance[graph.start.id] = 0;

    let unvisited = new Set(Object.keys(nodes)); 
    let searched = new Set();

    while (unvisited.size) {
        let currentId = minDistanceNode(unvisited, distance);
        unvisited.delete(currentId);
        if (nodes[currentId].status === 1) continue;
        searched.add(currentId);
        if (distance[currentId] === Infinity) return animateSearch(graph, searched);
        if (currentId === graph.target.id) {
          return animateSearch(graph, searched);
        }
        for (let neighbor of nodes[currentId].neighbors) {
          if (!searched.has(neighbor.id)) {
            neighbor.previousId = currentId;
            distance[neighbor.id] = distance[currentId] + 1;
          }
        }
    }
};
const minDistanceNode = (unvisited, distance) => {
  return Array.from(unvisited).reduce((minNode, node) =>
    distance[node] < distance[minNode] ? node : minNode
  );
};
```
- Breath-first Search: guarantees the shortest path
```javascript 
const breadthFirst = (graph) => {
  let queue = [graph.start];
  let searched = new Set();
  let searching = true;
  while (queue.length) {
    let currentNode = queue.shift();
    if (!searched.has(currentNode.id)) {
      searched.add(currentNode.id);
      currentNode.neighbors.forEach((neighbor, idx) => {
        if (!searched.has(neighbor.id) && neighbor.status === 5) {
          neighbor.previousId = currentNode.id;
          queue.push(neighbor);
          queue.push(graph.target);
          searched.add(graph.target.id);
          searching = false;
        } else if (!searched.has(neighbor.id) && neighbor.status === 0) {
          neighbor.previousId = currentNode.id;
          queue.push(neighbor);
        } else {
        }
      });
    }
    if (!searching) return animateSearch(graph, searched);
  }
  return animateSearch(graph, searched);
};
```
- Depth-first Search: does not guarantee the shortest path
```javascript
const depthFirst = (graph) => {
    let stack = [graph.start];
    let searched = new Set();
    let searching = true;
    while (stack.length) {
        let currentNode = stack.pop();
        if (!searched.has(currentNode.id)) {
            searched.add(currentNode.id);
            currentNode.neighbors.forEach((neighbor, idx) => {
              if (!searched.has(neighbor.id) && neighbor.status === 5) {
                neighbor.previousId = currentNode.id;
                stack.push(neighbor);
                stack.push(graph.target);
                searched.add(graph.target.id);
                searching = false;
              } else if (!searched.has(neighbor.id) && neighbor.status === 0) {
                neighbor.previousId = currentNode.id;
                stack.push(neighbor);
              } else {

              }
            });
        }
        if (!searching) return animateSearch(graph, searched);
    }
    return animateSearch(graph, searched);
};
```

## Technologies, Libraries, APIs

- Vanila JS for logic/animations, CSS for styling, HTML
- Webpack to bundle and transpile the source JavaScript code
- npm to manage project dependencies 
