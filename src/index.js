import Grid from "./scripts/grid";
import Graph from "./scripts/Graph";

document.addEventListener("DOMContentLoaded", () => {
  // let height = Math.floor(document.documentElement.clientHeight * .2);
  let height = Math.floor(document.documentElement.clientHeight * 0.6);
  // let width = Math.floor(document.documentElement.clientWidth * .3);
  let width = Math.floor(document.documentElement.clientWidth * 0.9);
  let graph = new Graph(height, width);
  graph.setup();
  // console.log(graph)
  // let grid = new Grid(height, width)
  // let nodesArr = grid.nodesArr
  // grid.renderGraph(document.getElementById("table_grid"));
  // grid.renderGrid(document.getElementById("table_grid"));
  // console.log(grid)
  // grid.addListenerForControls();
  // grid.addListenerForChangingNodes();
  // grid.addListenerForAddingWalls();
  // grid.addListenerForTutorial();
});
