import Node from "./node"
import Algorithms from "./algorithms"
import Mazes from "./mazes";


export default class Grid {
    constructor(height, width) {
        // this.createNodesArr = this.createNodesArr.bind(this);
        // this.nodesArr = this.createNodesArr();
        this.calc = new Algorithms(this);
        this.gen = new Mazes(this);
        this.nodesArr = [];
        this.nodes = {};
        this.height = height;
        this.width = width;
        this.rows = Math.floor(this.height/25);
        this.cols = Math.floor(this.width/25);
        this.startNodePos = [Math.floor(this.rows * .25), Math.floor(this.cols * .25)];
        this.targetNodePos = [Math.floor(this.rows * .75), Math.floor(this.cols * .75)];
        this.startNode = null;
        this.targetNode = null;
        this.speed = "fast";
        this.addObject = false;
        this.mouseDown = false;
        this.selectedAlgorithm = null;
        this.animate = []
    }

    renderGrid(tbl) {
        for (let i = 0; i < this.rows; i++) {
            let currentRowArray = [];
            let currentRow = document.createElement("tr");
            currentRow.id = `r${i}`;

            tbl.appendChild(currentRow)
            let currentRowContents = document.getElementById(currentRow.id)

            for (let j = 0; j < this.cols; j++) {
                let myCell = document.createElement("td");
                myCell.id = `${i}-${j}`
                currentRowContents.appendChild(myCell);
                if (i === this.startNodePos[0] && j === this.startNodePos[1]) {
                    this.startNode = new Node(myCell.id, 'start')
                    currentRowArray.push(this.startNode);
                    this.nodes[myCell.id] = this.startNode;
                    myCell.className = "start"
                    myCell.innerHTML = "<img src='./assets/chevrons_right.svg' id='start_node'></img>";
                } else if (i === this.targetNodePos[0] && j === this.targetNodePos[1]) {
                    this.targetNode = new Node(myCell.id, 'target')
                    currentRowArray.push(this.targetNode);
                    this.nodes[myCell.id] = this.targetNode;
                    myCell.innerHTML = "<img src='./assets/3d_cube.svg' id='target_node'></img>";
                }  else {
                    let newNode = new Node(myCell.id, 'empty');
                    currentRowArray.push(newNode);
                    this.nodes[myCell.id] = newNode;
                }
            }
            this.nodesArr.push(currentRowArray);
        }
    }

    reset() {
        this.nodesArr = []; //resets nodesArr
        this.nodes = {};
        this.animate = []

        let gridTable = document.getElementById("table_grid");
        while(gridTable.firstChild) {
            gridTable.removeChild(gridTable.lastChild);
        } //removes all children from table

        this.renderGrid(gridTable); // creates new gridTable and nodesArr
        console.log(this.nodesArr)
    }


    addListenerForControls() {
        let that = this;
        const toggleAddObject = document.getElementById('toggleAddObject');
        toggleAddObject.addEventListener("change", e => {
            e.preventDefault();
            this.addObject = true; 
            // console.log(this); 
        })

        const buttonClearGrid = document.getElementById('buttonClearGrid');
        
        buttonClearGrid.onclick = () => {
            that.reset()
        }

        const buttonDijkstra = document.getElementById('buttonDijkstra')
        const buttonAStar = document.getElementById('buttonAStar')
        const buttonBFS = document.getElementById('buttonBFS')
        const buttonDFS = document.getElementById('buttonDFS')
        const beginSearch = document.getElementById('beginSearch')

        buttonDijkstra.onclick = () => {
            beginSearch.innerText = "Begin Dijkstra's Algorithm"
        }
        buttonAStar.onclick = () => {
            beginSearch.innerText = "Begin A* Search Algorithm"
        }
        buttonBFS.onclick = () => {
            beginSearch.innerText = "Begin Breadth-first Search"
        }
        buttonDFS.onclick = () => {
            beginSearch.innerText = "Begin Depth-first Search"
        }
        beginSearch.onclick = () => {
            if (beginSearch.innerText === "Select an Algorithm") {
                alert("You must select an algorithm first")
            } else if (beginSearch.innerText = "Begin Breadth-first Search") {
                if(this.calc.bfs(this)) {
                    // console.log('it be working')
                    // let selectedPath = this.calc.getBFSPath();
                    this.calc.animateBFS();
                }; 
            }
        }

        const tutorial = document.getElementById('tutorial');
        tutorial.onclick = () => {
            tutorial.innerHTML = "test"
            
        }
        

    }

    addListenerForAddingWalls() {
        let grid = this;
        for(let row of grid.nodesArr) {
            for(let currentNode of row) {
                let currentEle = document.getElementById(currentNode.id);
                currentEle.onclick = (e) => {
                    e.preventDefault();
                    if (currentNode.type === "empty") {
                        currentNode.type = "wall";
                        currentEle.className = "wall";
                    } else if (currentNode.type === "wall") {
                        currentNode.type = "empty";
                        currentEle.className = "empty";
                    } else {
                        currentNode.type = currentNode.type;
                    }
                }
            }
        }
    }


    // toggleAddWalls() {
    //     const toggleAddWalls = document.getElementById('toggleAddWalls');
    //     toggleAddWalls.addEventListener("change", e => {
    //         if (this.addWalls = false) {
    //             this.addWalls = true; 
    //             console.log(this.addWalls);
    //         } else {
    //             this.addWalls = false;
    //             console.log(this.addWalls);
    //         }
    //     });
    // }

    // clearGrid() {

    // }


    // adjacent(node) {
    // const adj = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    // let arr = [];
    //     for(let sub of adj) {
    //         let pos = [node.x + sub[0], node.y + sub[1]];
    //         if(this.validPos(pos)){
    //             // this.adj.push(pos)
    //             arr.push(`${pos[0]}-${pos[1]}`);
    //         }
    //     }
    //     return node.adjacent.concat(arr);
    // }

    // validPos(pos) {
    //     pos[0] >= 0 && pos[0] < this.rows && pos[1] >= 0 && pos[1] < this.cols
    // }

        
}




