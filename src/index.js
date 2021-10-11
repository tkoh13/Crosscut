// import Node from "./scripts/node"
import Grid from "./scripts/grid"

document.addEventListener("DOMContentLoaded", () => {
    // let canvas = document.getElementById("canvas_grid")
    // let ctx = canvas.getContext("2d")

    let table_grid = document.getElementById("table_grid");
    // let WIDTH = 1800;
    // let HEIGHT = 1200;
    // let gridRows = 48;
    // let gridCols = 72;
    let grid = new Grid()//.createGrid(table_grid);
    grid.createGrid(table_grid); 
    // console.log("loaded");
})
