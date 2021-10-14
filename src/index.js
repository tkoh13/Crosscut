// import Node from "./scripts/node"
import Grid from "./scripts/grid"


document.addEventListener("DOMContentLoaded", () => {
    let height = Math.floor(document.documentElement.clientHeight * .75);
    let width = Math.floor(document.documentElement.clientWidth * .9);
    let grid = new Grid(height, width)
    let nodesArr = grid.nodesArr
    grid.renderGrid(document.getElementById("table_grid"));
    
    // let gridTable = document.getElementById("table_grid");
    // grid.renderGrid(gridTable);
    // console.log(gridTable);

    // let startNode = grid.startNode;
    // let targetNode = grid.targetNode;
    // console.log(startNode);
    // console.log(targetNode);
    // grid.reset(gridTable); 

    console.log(grid);
    // console.log(nodesArr);

    grid.addListenerForControls();
    grid.addListenerForAddingWalls();

    
 
})

