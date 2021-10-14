import Grid from "./scripts/grid"


document.addEventListener("DOMContentLoaded", () => {
    let height = Math.floor(document.documentElement.clientHeight * .75);
    let width = Math.floor(document.documentElement.clientWidth * .9);
    let grid = new Grid(height, width)
    // let nodesArr = grid.nodesArr
    grid.renderGrid(document.getElementById("table_grid"));
    // console.log(grid)
    grid.addListenerForControls();
    grid.addListenerForAddingWalls();
    grid.addListenerForTutorial();

})

