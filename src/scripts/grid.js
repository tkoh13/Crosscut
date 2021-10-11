import Node from "./node"
export default class Grid {
    constructor() {
        // this.grid = document.getElementById("table_grid");
        this.gridArray = [];
        // this.gridHTML = "";
        this.WIDTH = 1500;
        this.HEIGHT = 1000;
        this.gridRows = 40;
        this.gridCols = 60;
    }

    createGrid(tbl) {
        // let tbl = document.getElementById("table_grid");
        for (let i = 0; i < this.gridRows; i++) {
            let currentRowArray = [];
            let currentRow = document.createElement("tr");
            currentRow.id = `r${i}`;

            tbl.appendChild(currentRow)
            let currentRowContents = document.getElementById(currentRow.id)
            // let currentRow = `<tr id="r${i}">`;
            for (let j = 0; j < this.gridCols; j++) {
                // currentRow += `<td id="${i}-${j}"></td>`;
                let myCell = document.createElement("td");
                myCell.id = `${i}-${j}`
                currentRowContents.appendChild(myCell);
                currentRowArray.push(new Node(myCell.id, 'empty'))


            }
            // this.gridHTML += `${currentHTMLRow}</tr>`;
            this.gridArray.push(currentRowArray);
        }
        // return gridHTML
    }
}