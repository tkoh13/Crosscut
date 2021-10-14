export default class Algorithms {
    constructor(grid) {
        this.grid = grid;
    }

    getAdjacent(node, name) {
        // const positions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        let adjacent = [];
        // for (let pos of positions) {
        //     let adjPos = [node.x + pos[0], node.y + pos[1]]
        //         if (((adjPos[0]) >= 0) && ((adjPos[0]) < this.grid.rows) && ((adjPos[1]) >= 0) && ((adjPos[1]))) {
        //             let potentialAdjacent = `${(node.x - 1).toString()}-${node.y.toString()}`
        //             if (this.grid.nodes[potentialAdjacent].type !== "wall") {
        //                 if (name === "bfs") {
        //                     adjacent.push(potentialAdjacent);
        //                 } else {
        //                     adjacent.unshift(potentialAdjacent);
        //                 }
        //             }
        //         }
                
        // }
        let potentialAdjacent;
        if (this.grid.nodesArr[node.x - 1] && this.grid.nodesArr[node.x - 1][node.y]) {
            potentialAdjacent = `${(node.x - 1).toString()}-${node.y.toString()}`
            if (this.grid.nodes[potentialAdjacent].type !== "wall") {
                if (name === "bfs") {
                    adjacent.push(potentialAdjacent);
                } else {
                    adjacent.unshift(potentialAdjacent);
                }
            }
        }
        if (this.grid.nodesArr[node.x][node.y + 1]) {
            potentialAdjacent = `${node.x.toString()}-${(node.y + 1).toString()}`
            if (this.grid.nodes[potentialAdjacent].type !== "wall") {
                if (name === "bfs") {
                    adjacent.push(potentialAdjacent);
                } else {
                    adjacent.unshift(potentialAdjacent);
                }
            }
        }
        if (this.grid.nodesArr[node.x + 1] && this.grid.nodesArr[node.x + 1][node.y]) {
            potentialAdjacent = `${(node.x + 1).toString()}-${node.y.toString()}`
            if (this.grid.nodes[potentialAdjacent].type !== "wall") {
                if (name === "bfs") {
                    adjacent.push(potentialAdjacent);
                } else {
                    adjacent.unshift(potentialAdjacent);
                }
            }
        }
        if (this.grid.nodesArr[node.x][node.y - 1]) {
            potentialAdjacent = `${node.x.toString()}-${(node.y - 1).toString()}`
            if (this.grid.nodes[potentialAdjacent].type !== "wall") {
                if (name === "bfs") {
                    adjacent.push(potentialAdjacent);
                } else {
                    adjacent.unshift(potentialAdjacent);
                }
            }
        }
        return adjacent;
    }
    
    
    getBFSPath() {
        // console.log(this.grid.targetNode)
        let BFSPath = [];
        let currentNode = this.grid.targetNode;
        // console.log(currentNode);
        while(currentNode.previousid !== null) { //add .previousId here check after lunch
            // if(!currentNode.previousid){
            //     continue;
            // }
            let pp = currentNode.previousid;
            let previousNode = this.grid.nodes[pp];
            // console.log(currentNode)
            // return console.log(previousNode);
            BFSPath.unshift(currentNode);
            // console.log(BFSPath)
            currentNode = previousNode
        }
        console.log(BFSPath)
        return BFSPath;
    }
    
    animateBFSPath(BFSPath) {
        for (let i = 0; i < BFSPath.length; i++) {
            setTimeout(() => {
                let node = BFSPath[i];
                document.getElementById(node.id).className = 'pathNode'
            }, 50 * i);
        }
    }
    
    animateBFS() {
        for(let i = 0; i <= this.grid.animate.length; i++) {
            if(i === this.grid.animate.length) {
                setTimeout(() => {
                    this.animateBFSPath(this.getBFSPath());
                }, 15 * i);
                return;
            }
            setTimeout(() => {
                let node = this.grid.animate[i];
                document.getElementById(node.id).className = 'searchedNode'
            }, 10 * i);
        }
    }
    
    bfs() {
        let start = this.grid.startNode;
        let target = this.grid.targetNode
        let queue = [start];
        let searchedNodes = { start: true };
        while (queue.length) {
            let currentNode = queue.shift();
            currentNode.visited = true;
            if (currentNode.id === this.grid.targetNode.id) {
                // console.log(this.grid.animate);
                // console.log("muy bien!");
                let targetIdx = this.grid.animate.indexOf(target);
                this.grid.animate = this.grid.animate.slice(0, targetIdx);
                return true;
            }
            let currentAdjacent = this.getAdjacent(currentNode, 'bfs');

            for (let adj of currentAdjacent) {
                let adjPos = adj.split("-");
                let adjNode = this.grid.nodesArr[adjPos[0]][adjPos[1]];
                // console.log(adjNode);
                if (!searchedNodes[adjNode.id] && adjNode.type !== "wall") {
                    // if (adjNode !== target){
                        // console.log(adjNode);
                        searchedNodes[adjNode.id] = true;
                        this.grid.animate.push(adjNode);
                        // adjNode.visited = true;
                        // console.log(searchedNodes);
                        if(adjNode !== this.grid.startNode){
                            adjNode.previousPos = currentNode.pos;
                            adjNode.previousid = currentNode.id;
                            queue.push(adjNode);
                        }
                    // } //else {
                        // break;
                    // }
                }
                // if(adjNode.type !== "wall") {
                // }
    
                // console.log(adjNode);
    
                // console.log(adjNode.previousPos)
                // return console.log(adjNode);
    
            }
        }
        // console.log("nosir")
        return false;
        // console.log(grid.startNode)
    }
    

    
    
}