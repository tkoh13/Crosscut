import Node from "./node"

export default class Grid {
    constructor(height, width) {
        // this.createNodesArr = this.createNodesArr.bind(this);
        // this.nodesArr = this.createNodesArr();
        this.nodesArr = []
        this.height = height;
        this.width = width;
        this.gridRows = Math.floor(this.height/25);
        this.gridCols = Math.floor(this.width/25);
        this.startNodePos = [Math.floor(this.gridRows * .25), Math.floor(this.gridCols * .25)];
        this.targetNodePos = [Math.floor(this.gridRows * .75), Math.floor(this.gridCols * .75)];
    }

    renderGrid(tbl) {
        for (let i = 0; i < this.gridRows; i++) {
            let currentRowArray = [];
            let currentRow = document.createElement("tr");
            currentRow.id = `r${i}`;

            tbl.appendChild(currentRow)
            let currentRowContents = document.getElementById(currentRow.id)

            for (let j = 0; j < this.gridCols; j++) {
                let myCell = document.createElement("td");
                myCell.id = `${i}-${j}`
                currentRowContents.appendChild(myCell);
                if (i === this.startNodePos[0] && j === this.startNodePos[1]) {
                    currentRowArray.push(new Node(myCell.id, 'start'));
                    myCell.innerHTML = "<img src='./assets/chevrons_right.svg' id='start_node'></img>";
                } else if (i === this.targetNodePos[0] && j === this.targetNodePos[1]) {
                    currentRowArray.push(new Node(myCell.id, 'target'));
                    myCell.innerHTML = "<img src='./assets/3d_cube.svg' id='target_node'></img>";
                }  else {
                    currentRowArray.push(new Node(myCell.id, 'empty'));
                }
            }
            this.nodesArr.push(currentRowArray);
        }
    }

    // createNodesArr() {
    //     let nodesArr = []
    //     for (let i = 0; i < this.gridRows; i++) {
    //         // let currentRowArr = [];
    //         nodesArr.push([])
    //         for (let j = 0; j < this.gridCols; j++) {
    //             let id = `${i}-${j}`
    //             if (i === this.startNodePos[0] && j === this.startNodePos[1]) {
    //                 // currentRowArr.push(new Node(id, 'start'));
    //                 nodesArr[i].push(new Node(id, 'start'));
    //             } else if (i === this.targetNodePos[0] && j === this.targetNodePos[1]) {
    //                 // currentRowArr.push(new Node(id, 'target'));
    //                 nodesArr[i].push(new Node(id, 'target'));
    //             // } else currentRowArr.push(new Node(id, 'empty'));
    //             } else nodesArr[i].push(new Node(id, 'empty'))
    //         }
    //         // this.gridHTML += `${currentHTMLRow}</tr>`;
    //         // nodesArr.push(currentRowArr);
    //     }
    //     return nodesArr
    // }

}