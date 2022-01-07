import GraphNode from "./GraphNode";
import { depthFirst, breadthFirst, dijkstras } from "./Algorithms";
import { simpleDivision, recursiveBackTracker, recursiveDivision } from "./MazeGeneration";

class Graph {
  constructor(height, width) {
    // this.nodes = []; // choosing array instead of object since it'll be a grid.
    this.nodes = {};
    // this.rows = 6;
    // this.cols = 6;
    this.rows = Math.floor(height / 25);
    this.cols = Math.floor(width / 25);
    this.start = null;
    this.target = null;
    this.startRow = Math.floor(this.rows * 0.25);
    this.startCol = Math.floor(this.cols * 0.25);
    this.targetRow = Math.floor(this.rows * 0.75);
    this.targetCol = Math.floor(this.cols * 0.75);
    this.speed = 3;
    this.animate = [];
    this.animateStatus = false;
    this.mouseDown = false;
    this.selectedNode = null;
    this.previousNode = null;
  }

  renderGraph(tableEle) {
    for (let i = 0; i < this.rows; i++) {
      let currentRowEle = document.createElement("tr");
      currentRowEle.id = `r${i}`;
      tableEle.appendChild(currentRowEle);
      // creating all nodes
      for (let j = 0; j < this.cols; j++) {
        let myCell = document.createElement("td");
        myCell.id = `${i}-${j}`;
        currentRowEle.appendChild(myCell);
        if (i === this.startRow && j === this.startCol) {
          // debugger
          this.start = new GraphNode(myCell.id, 2);
          this.nodes[myCell.id] = this.start;
          myCell.className = "start";
        } else if (i === this.targetRow && j === this.targetCol) {
          this.target = new GraphNode(myCell.id, 5);
          this.nodes[myCell.id] = this.target;
          myCell.className = "target";
        } else {
          let newNode = new GraphNode(myCell.id, 0);
          this.nodes[myCell.id] = newNode;
          myCell.className = "empty";
        }
      }
    }
    for (let node of Object.values(this.nodes)) {
      node.getNeighbors(this);
    }
  }

  reset() {
    let tableEle = document.getElementById("table_grid");
    while (tableEle.firstChild) {
      tableEle.removeChild(tableEle.lastChild);
    }
    this.setup();
  }

  clearWalls() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let id = `${i}-${j}`;
        let currentNode = this.nodes[id];
        let currentEle = document.getElementById(id);
        if (currentNode.status === 1) {
          currentNode.status = 0;
          currentEle.className = "empty";
        }
      }
    }
  }

  clearPath() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let id = `${i}-${j}`;
        let currentNode = this.nodes[id];
        let currentEle = document.getElementById(id);
        if (
          (currentEle.className === "searchedNode" || "pathNode")
          && currentNode.status === 0
        ) {
          currentEle.className = "empty";
        }
      }
    }
  }
  // Nodes section
  changeNode(node, element) {
    if (!node.status) {
      node.status = 1;
      element.className = "wall";
    } else {
      node.status = 0;
      element.className = "empty";
    }
  }

  moveNode(node, element) {
    if (this.selectedNode === 2) {
      node.status = this.selectedNode;
      this.start = node;
      element.className = "start";
    } else if (this.selectedNode === 5) {
      node.status = this.selectedNode;
      this.target = node;
      element.className = "target";
    } else if (this.selectedNode === 3 || this.selectedNode === 4) {
      console.log("no weights yet...");
    } else {
    }
  }

  addListenerForChangingNodes() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let currentId = `${i}-${j}`;
        let currentNode = this.nodes[currentId];
        let currentEle = document.getElementById(currentId);
        currentEle.onmousedown = (e) => {
          e.preventDefault();
          this.mouseDown = true;
          if (currentNode.status <= 1) {
            this.changeNode(currentNode, currentEle);
          } else {
            this.selectedNode = currentNode.status;
            // this.previousNode = currentNode.status;
          }
        };

        currentEle.onmouseup = () => {
          // e.preventDefault();
          if (currentNode.status <= 1) {
            this.moveNode(currentNode, currentEle);
          } else if (this.selectedNode == 2 && currentNode.status === 5) {
            const resetStart = `${this.startRow}-${this.startCol}`;
            this.start = this.nodes[resetStart];
            this.start.status = 2;
            document.getElementById(resetStart).className = "start";
          } else if (this.selectedNode == 5 && currentNode.status === 2) {
            const resetTarget = `${this.targetRow}-${this.targetCol}`;
            this.target = this.nodes[resetTarget];
            this.target.status = 5;
            document.getElementById(resetTarget).className = "target";
          } else {
            // this.previousNode = currentNode.status;
            // this.mouseDown = false;
            // this.selectedNode = null;
            // this.previousNode = null;
          }
          this.mouseDown = false;
          this.selectedNode = null;
          this.previousNode = null;
          // assigning neighbors to created nodes
          for (let node of Object.values(this.nodes)) {
            node.getNeighbors(this);
          }
        };

        currentEle.onmouseenter = () => {
          // e.preventDefault();
          if (!this.selectedNode && this.mouseDown && currentNode.status <= 1) {
            this.changeNode(currentNode, currentEle);
          }
          if (this.selectedNode && this.mouseDown) {
            if (currentNode.status <= 1) {
              this.previousNode = currentNode.status;
              this.moveNode(currentNode, currentEle);
            } else {
              this.previousNode = currentNode.status;
            }
          }
        };

        currentEle.onmouseleave = () => {
          if (this.selectedNode && this.mouseDown) {
            if (this.previousNode === 0) {
              currentNode.status = 0;
              currentEle.className = "empty";
            } else if (this.previousNode === 1) {
              currentNode.status = 1;
              currentEle.className = "wall";
            } else if (this.previousNode === 2) {
              currentNode.status = 2;
              currentEle.className = "start";
            } else if (this.previousNode == 5) {
              currentNode.status = 5;
              currentEle.className = "target";
            } else if (currentNode === 3 || currentNode === 4) {
              console.log("Need to incorporate other elements");
            } else {
              currentNode.status = 0;
              currentEle.className = "empty";
            }
          }
        };
      }
    }
  }

  addListenerForControls() {
    // refresh and clear buttons
    const refreshButton = document.getElementById("refreshButton");
    refreshButton.onclick = () => {
      window.location.reload(true);
    };

    const buttonClearGrid = document.getElementById("buttonClearGrid");
    buttonClearGrid.onclick = () => {
      this.reset();
    };

    const buttonClearWalls = document.getElementById("buttonClearWalls");
    buttonClearWalls.onclick = () => {
      this.clearWalls();
    }

    const buttonClearPath = document.getElementById("buttonClearPath");
    buttonClearPath.onclick = () => {
      this.clearPath();
    }
    // maze generation buttons
    const buttonSimpleMaze = document.getElementById("buttonSimpleMaze");
    buttonSimpleMaze.onclick = () => {
      simpleDivision(this, 0, this.rows, 0, this.cols);
    }

    // const buttonDFSMaze = document.getElementById("buttonDFSMaze");
    // buttonDFSMaze.onclick = () => {
    //   recursiveBackTracker(this.nodes, this.start);
    // }

    // const buttonRecDiv = document.getElementById("buttonRecDiv");
    // buttonRecDiv.onclick = () => {
    //   recursiveDivision(this, 0, this.rows, 0, this.cols);
    //   // recursiveDivision(this, 1, this.rows - 2, 1, this.cols - 2);
    // }
    // speed control buttons
    const buttonFast = document.getElementById("buttonFast");
    const buttonAverage = document.getElementById("buttonAverage");
    const buttonSlow = document.getElementById("buttonSlow");
    buttonFast.onclick = () => {
      this.speed = 3;
      buttonFast.classList.add("speed-selection");
      buttonAverage.classList.remove("speed-selection");
      buttonSlow.classList.remove("speed-selection");
    }
    buttonAverage.onclick = () => {
      this.speed = 2;
      buttonFast.classList.remove("speed-selection");
      buttonAverage.classList.add("speed-selection");
      buttonSlow.classList.remove("speed-selection");
    }
    buttonSlow.onclick = () => {
      this.speed = 1;
      buttonFast.classList.remove("speed-selection");
      buttonAverage.classList.remove("speed-selection");
      buttonSlow.classList.add("speed-selection");
    }
    // search algorithm buttons
    const buttonDFS = document.getElementById("buttonDFS");
    const buttonBFS = document.getElementById("buttonBFS");
    const buttonDijkstra = document.getElementById("buttonDijkstra");
    // const buttonAStar = document.getElementById('buttonAStar')
    const beginSearch = document.getElementById("beginSearch");

    buttonDijkstra.onclick = () => {
      beginSearch.innerText = "Begin Dijkstra's Algorithm";
      beginSearch.classList.add("shake");
    };
    // buttonAStar.onclick = () => {
    //     beginSearch.innerText = "Begin A* Search Algorithm"
    // }
    buttonBFS.onclick = () => {
      beginSearch.innerText = "Begin Breadth-first Search";
      beginSearch.classList.add("shake");
    };
    buttonDFS.onclick = () => {
      beginSearch.innerText = "Begin Depth-first Search";
      beginSearch.classList.add("shake");
    };
    beginSearch.onclick = () => {
      switch (beginSearch.innerText) {
        case "Select an Algorithm":
          alert("You must select an algorithm first");
          break;
        case "Begin Breadth-first Search":
          breadthFirst(this);
          break;
        case "Begin Depth-first Search":
          depthFirst(this, this.start);
          break;
        case "Begin Dijkstra's Algorithm":
          dijkstras(this);
          break;
        default:
          break;
      }
    };
  }

  addListenerForTutorial() {
    const openpopupButtons = document.querySelectorAll("[data-popup-target]");
    const closepopupButtons = document.querySelectorAll("[data-popup-close]");
    const overlay = document.getElementById("overlay");

    openpopupButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = document.querySelector(button.dataset.popupTarget);
        openpopup(popup);
      });
    });

    overlay.addEventListener("click", () => {
      const popups = document.querySelectorAll(".popup.active");
      popups.forEach((popup) => {
        closepopup(popup);
      });
    });

    closepopupButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = button.closest(".popup");
        closepopup(popup);
      });
    });

    function openpopup(popup) {
      if (popup == null) return;
      popup.classList.add("active");
      overlay.classList.add("active");
    }

    function closepopup(popup) {
      if (popup == null) return;
      popup.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  setup() {
    this.renderGraph(document.getElementById("table_grid"));
    this.addListenerForControls();
    this.addListenerForChangingNodes();
    this.addListenerForTutorial();
  }
}

export default Graph;