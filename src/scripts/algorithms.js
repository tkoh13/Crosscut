const animatePath = (graph) => {
  console.log("animating path")
  let interval;
  if (graph.speed === 3) interval = 10;
  else if (graph.speed === 2) interval = 15;
  else interval = 20;

  let path = [];
  let currentNode = graph.target;
  while (currentNode.previousId) {
    // debugger
    if (currentNode === graph.start) break; 
    path.unshift(currentNode);
    currentNode = graph.nodes[currentNode.previousId];
  }
  console.log(path.length);
  for (let i = 0; i < path.length; i ++) {
      setTimeout(() => {
          let node = path[i]; 
          if (node !== graph.target) {
            document.getElementById(node.id).className = "pathNode";
          }
      }, interval += 50);
  }
};

const animateSearch = (graph, searched) => {
  console.log("animating search")
    let interval, additional
    if (graph.speed === 3) interval = 10, additional = 15;
    else if(graph.speed === 2) interval = 20, additional = 25;
    else interval = 30, additional = 40;
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
