class GraphNode {
  constructor(id, status) {
    this.id = id;
    this.status = status;
    // 0: empty, 1: wall, 2: start, 3: weight1, 4: weight2, 5: target
    this.neighbors = []; // this.getNeighbors(graph); //null //
    this.previousId = null;
  }

  getRow() {
    return parseInt(this.id.split("-")[0]);
  }

  getCol() {
    return parseInt(this.id.split("-")[1]);
  }

  getPos() {
    return [this.getRow(), this.getCol()];
  }

  getNeighbors(graph) {
    const adjacentPos = [
      // [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
    ];
    this.neighbors = [];
    for (let pos of adjacentPos) {
      let adjacentX = this.getRow() + pos[0];
      let adjacentY = this.getCol() + pos[1];
      let adjacentId = `${adjacentX}-${adjacentY}`;
      let adjacentNode = graph.nodes[adjacentId];
      if (adjacentNode && adjacentNode.status !== 1 && !this.neighbors.includes(adjacentNode)) {
        this.neighbors.push(graph.nodes[adjacentId]);
      }
    }
  }
}


export default GraphNode