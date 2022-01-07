export const simpleDivision = (graph, rowStart, rowEnd, colStart, colEnd) => {
  if (rowEnd - rowStart < 5 || colEnd - colStart < 5) return;
  // console.log(rowStart, rowEnd, colStart, colEnd); 
  // console.log(row, col)
  let possibleRows = [];
  for (let n = rowStart; n < rowEnd; n += 2) {
    possibleRows.push(n);
  }
  let possibleCols = [];
  for (let n = colStart; n < colEnd; n += 2) {
    possibleCols.push(n);
  }
  
  possibleRows.forEach(r => {
    for (let c = 0; c < colEnd; c++) {
      let randNum = [
        Math.floor(Math.random() * colEnd),
        Math.floor(Math.random() * colEnd),
        Math.floor(Math.random() * colEnd),
      ];
      let rand = Math.floor(Math.random() * colEnd); 
      let id = `${r}-${c}`;
      if ((!randNum.includes(c)) && (id !== graph.start.id) && (id !== graph.target.id)) {
      // if ((c !== rand) && (id !== graph.start.id) && (id !== graph.target.id)) {
        // debugger
        // console.log(id)
        // if (id !== graph.start.id && id !== graph.target.id) {
          graph.nodes[id].status = 1;
          document.getElementById(id).className = "wall";
        // }
      } else {
        if (id !== graph.start.id && id !== graph.target.id) {
          graph.nodes[id].status = 0;
          document.getElementById(id).className = "empty";
        }
      }
    }
  });
  // possibleCols.forEach((c) => {
  //   for (let r = 0; r < rowEnd; r++) {
  //     let randNum = [
  //       Math.floor(Math.random() * colEnd),
  //       Math.floor(Math.random() * colEnd),
  //       Math.floor(Math.random() * colEnd),
  //     ];
  //     let rand = Math.floor(Math.random() * rowEnd);
  //     let id = `${r}-${c}`;
  //     if (!randNum.includes(r) && id !== graph.start.id && id !== graph.target.id) {
  //     // if (r !== rand && id !== graph.start.id && id !== graph.target.id) {
  //       // debugger
  //       // console.log(id)
  //       // if (id !== graph.start.id && id !== graph.target.id) {
  //         graph.nodes[id].status = 1;
  //         document.getElementById(id).className = "wall";
  //       // }
  //     } else {
  //       if (id !== graph.start.id && id !== graph.target.id) {
  //         graph.nodes[id].status = 0;
  //         document.getElementById(id).className = "empty";
  //       }
  //     }
  //   }
  // });

  
  // let row = Math.floor((rowEnd - rowStart)/2);
  // let col = Math.floor((colEnd - colStart)/2);
  // if (row <= col) {
  //   for (let i = 0; i < colEnd; i++) {
  //     // console.log(Math.floor(colEnd / 5)); // amount of empty needed

  //     if (i !== Math.floor(Math.random() * (colEnd))) {
  //       let id = `${row}-${i}`;
  //       document.getElementById(id).className = "wall";
  //       // let ele = document.getElementById(id).className = "wall";
  //       graph.nodes[id].status = 1;
  //     }
  //   }

  // } else {
  //   for (let i = 0; i < rowEnd; i++) {
  //     if (i !== Math.floor(Math.random() * rowEnd)) {
  //       let id = `${i}-${col}`;
  //       document.getElementById(id).className = "wall";
  //       // let ele = document.getElementById(id).className = "wall";
  //       graph.nodes[id].status = 1;
  //     }
  //   }

  // }
}

export const recursiveBackTracker = (nodes, start) => {
  // starting off with the start node
  let stack = []; 
  let currentNode = start;
  let visited = new Set();
  
  // mark it as visited
  visited.add(currentNode.id); 
  // delete unvisited[currentNode.id];
  // while there are unvisited cells
  while (visited.size !== Object.keys(nodes).length) {
  // while (Object.keys(unvisited).length) {
            // let currentNode = stack.pop();
            // delete unvisited[currentNode.id]
    // if the current cell has any neighbors which have not been visited
    // console.log(currentNode);
    if (currentNode.neighbors.some(node => !visited.has(node.id))) {
      // push the current cell to the stack
      stack.push(currentNode);
      // remove the wall between the current cell and the chosen cell
      // randomly choose one of the unvisited neighbors
      // make the chosen cell the current cell and mark it as visited
      currentNode = randomUnvisited(currentNode, visited);
      document.getElementById(currentNode.id).className = "searchedNode";

      visited.add(currentNode.id); 
      // delete unvisited[currentNode.id];
      // else if stack is not empty
    } else if (stack.length) {
      // debugger
      console.log("else if")
      currentNode = stack.pop();
      // recursiveBackTracker(nodes, start);
    } else {
      console.log("else")
    }
  }
      // pop a cell from the stack
      // make the current cell 

};

const randomUnvisited = (node, visited) => {
  let idx = Math.floor(Math.random() * (node.neighbors.length))
  if (visited.has(node.neighbors[idx])) {
    randomUnvisited(node, visited);
  } else {
    return node.neighbors[idx]; 
  }
}

const randomNeighbor = ({ neighbors }) => {
  // let neighbors = node.neighbors;
  let idx = Math.floor(Math.random() * (neighbors.length))

  return neighbors[idx]; 
}








export const recursiveDivision = (graph, rowStart, rowEnd, colStart, colEnd) => { // , first) => {
  console.log("start")
  if (rowEnd < rowStart || colEnd < colStart) return;
  // debugger
  let animate = new Set()
  let rows = rowEnd - rowStart;
  let cols = colEnd - colStart;
  if (rows >= cols) {
    console.log("horizontal")
    // debugger
    let possibleRows = [];
    for (let r = rowStart; r < rowEnd; r += 2) {
      possibleRows.push(r);
    }
    let possibleCols = [];
    for (let c = colStart; c < colEnd; c += 2) {
      possibleCols.push(c);
    }
    let randRowIdx = Math.floor(Math.random() * possibleRows.length);
    let randColIdx = Math.floor(Math.random() * possibleCols.length);
    let randRow = possibleRows[randRowIdx];
    let randCol = possibleCols[randColIdx];
    Object.values(graph.nodes).forEach(node => {
      let r = node.getRow();
      let c = node.getCol();
      if (
        r === randRow &&
        c !== randCol &&
        c >= colStart &&
        c <= colEnd
      ) {
        // let currentEle = document.getElementById(`${r}-${c}`);
        if (node !== graph.start && node !== graph.target) {
          document.getElementById(`${r}-${c}`).className = "wall";
          animate.add(node.id);
          node.status = 1
        }
      }
    });
    console.log("randRow", randRow);
    console.log("randCol", randCol);
    console.log("rowStart", rowStart);
    console.log("rowEnd", rowEnd);
    console.log("colStart", colStart);
    console.log("colEnd", colEnd);
    if (randRow - 2 - rowStart > colEnd - colStart) {
      console.log("horizontal if")
      // recursiveDivision(graph, rowStart, randRow + 2, colStart, colEnd)
      recursiveDivision(graph, randRow - 2, rowEnd, colStart, colEnd)
    } 
    if (rowEnd - (randRow -2) > colEnd - colStart) {
      console.log("horizontal else");
      recursiveDivision(graph, rowStart, randRow + 2, colStart, colEnd)
      // recursiveDivision(graph, randRow - 2, rowEnd, colStart, colEnd)
    }
  } else {
    // vertical // vertical // vertical // vertical // vertical // vertical
    console.log("vertical");
    // debugger
    let possibleCols = [];
    for (let c = colStart; c < colEnd; c += 2) {
      possibleCols.push(c);
    }
    let possibleRows = [];
    for (let r = rowStart; r < rowEnd; r += 2) {
      possibleRows.push(r);
    }
    let randColIdx = Math.floor(Math.random() * possibleCols.length);
    let randRowIdx = Math.floor(Math.random() * possibleRows.length);
    let randCol = possibleCols[randColIdx];
    let randRow = possibleRows[randRowIdx];

    Object.values(graph.nodes).forEach((node) => {
      let r = node.getRow();
      let c = node.getCol();
      if (c === randCol && r !== randRow && r >= rowStart && r <= rowEnd) {
        // let currentEle = document.getElementById(`${r}-${c}`);
        if (node !== graph.start && node !== graph.target) {
          document.getElementById(`${r}-${c}`).className = "wall";
          animate.add(node.id);
          node.status = 1;
        }
      }
    });

    if (rowEnd - rowStart > randCol - 2 - colStart) {
      recursiveDivision(graph, rowStart, rowEnd, colStart, randCol - 2);
      // recursiveDivision(graph, rowStart, rowEnd, randCol + 2, colEnd);
    } 
    if (rowEnd - rowStart > colEnd - (randCol + 2)) {
      // recursiveDivision(graph, rowStart, rowEnd, colStart, randCol - 2);
      recursiveDivision(graph, rowStart, rowEnd, randCol + 2, colEnd);
    }
  }
}