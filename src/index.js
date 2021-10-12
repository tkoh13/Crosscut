// import Node from "./scripts/node"
import Grid from "./scripts/grid"

document.addEventListener("DOMContentLoaded", () => {
    let height = Math.floor(document.documentElement.clientHeight * .75);
    let width = Math.floor(document.documentElement.clientWidth * .9);
    let grid = new Grid(height, width)
    let nodesArr = grid.nodesArr
    let gridTable = document.getElementById("table_grid");
    grid.renderGrid(gridTable);
    console.log(grid);
    console.log(nodesArr);
    console.log(gridTable);
})

