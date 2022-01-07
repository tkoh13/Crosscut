const animatePath = (graph) => {
  let interval;
  if (graph.speed === 3) interval = 2;
  else if (graph.speed === 2) interval = 10;
  else interval = 15;

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
    if (graph.speed === 3) interval = 2, additional = 2;
    else if(graph.speed === 2) interval = 10, additional = 10;
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
      // for (let neighbor of currentNode.neighbors) {
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
          // console.log(neighbor) // start node
        }
      });
      // }
    }
    if (!searching) return animateSearch(graph, searched);
  }
  return animateSearch(graph, searched);
};

export const dijkstras = (graph) => {
  // object to track distance keys are the nodes
  let distance = {};
  const { nodes } = graph;
  // set all nodes' distance to infinity
  for (let node in nodes) {
    distance[node] = Infinity;
  }
  // setting start equal to 0
  distance[graph.start.id] = 0;
  // way to check to see if the node has been visited
  let unvisited = new Set(Object.keys(nodes)); // sets all nodes from graph in the unvisited set
  let searched = new Set();
  // let previous = {};
  // while some nodes are still unvisited
  while (unvisited.size) {
    // for Sets, we must use .size to get the num members in that Set instead of .length
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
// this helper function will find the unvisited node with the smallest distance
const minDistanceNode = (unvisited, distance) => {
  // function minDistanceNode(unvisited, distance) {
  // unvisited is a Set of string (nodes) and distance is an object where the keys are strings (nodes)
  // convert the unvisited set into an array
  return Array.from(unvisited).reduce((minNode, node) =>
    distance[node] < distance[minNode] ? node : minNode
  );
};
