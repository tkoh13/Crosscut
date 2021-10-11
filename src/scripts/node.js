
export default class Node {
    constructor(id, status){
        this.id = id; // in the form of "r-c"
        this.x = parseInt(this.id.split("-")[0]);
        this.y = parseInt(this.id.split("-")[1]);
        this.pos = [this.x, this.y];
        this.status = status;
        // this.previousNode = null;
        // this.path = null;
        // this.direction = null;
        // this.storedDirection = null;
        // this.distance = Infinity;
        // this.totalDistance = Infinity;
        // this.heuristicDistance = null;
        // this.weight = 0;
        // this.relatesToObject = false;
        // this.overwriteObjectRelation = false;

        // this.otherid = id;
        // this.otherstatus = status;
        // this.otherpreviousNode = null;
        // this.otherpath = null;
        // this.otherdirection = null;
        // this.otherstoredDirection = null;
        // this.otherdistance = Infinity;
        // this.otherweight = 0;
        // this.otherrelatesToObject = false;
        // this.otheroverwriteObjectRelation = false;
    }
}