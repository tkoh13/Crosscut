
export default class Node {
    constructor(id, type){
        this.id = id; // in the form of "r-c"
        this.x = parseInt(this.id.split("-")[0]);
        this.y = parseInt(this.id.split("-")[1]);
        this.pos = [this.x, this.y];
        this.type = type;
        this.searched = false;
    }
}