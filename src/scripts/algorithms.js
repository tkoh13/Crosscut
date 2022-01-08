const animatePath = (graph) => {
  let interval;
  if (graph.speed === 3) interval = 15;
  else if (graph.speed === 2) interval = 20;
  else interval = 25;

  let path = [];
  let currentNode = graph.target;
  while (currentNode.previousId) {
    if (currentNode === graph.start) break; 
    path.unshift(currentNode);
    currentNode = graph.nodes[currentNode.previousId];
  }
  for (let i = 0; i < path.length; i ++) {
      setTimeout(() => {
          let node = path[i]; 
          if (node !== graph.target) {
            document.getElementById(node.id).className = "pathNode";
          }
      }, interval += 10);
  }
};

const animateSearch = (graph, searched) => {
    let interval, additional
    if (graph.speed === 3) interval = 10, additional = 10;
    else if(graph.speed === 2) interval = 15, additional = 15;
    else interval = 20, additional = 20;
    // debugger
    searched.forEach((id) => {
        if (graph.nodes[id] === graph.start) {
            null; 
        } else if (graph.nodes[id] === graph.target) {
            setTimeout(() => {
              animatePath(graph);
            }, (interval += 1000));
        }else {
            setTimeout(() => {
            document.getElementById(id).className = "searchedNode";
            }, interval += additional);
        }
    });
    // if (!animating) animatePath(graph);
};

export const depthFirst = (graph) => {
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
}

export const breadthFirst = (graph) => {
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
          // currentNode.neighbors[idx + 1].previousId = currentNode.id;
          // currentNode.neighbors[idx + 2].previousId = currentNode.id;
          queue.push(neighbor);
          // queue.push(currentNode.neighbors[idx + 1]);
          // queue.push(currentNode.neighbors[idx + 2]);
          queue.push(graph.target);
          // searched.add(currentNode.neighbors[idx + 1].id);
          // searched.add(currentNode.neighbors[idx + 2].id);
          searched.add(graph.target.id);
          searching = false;
          // return animateSearch(graph, searched);
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

export const dijkstras = (graph) => {
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
