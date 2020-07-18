let cell_m = require("./cell")

class Board{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        this.grid = [];

        this.initialize();
    }

    //Populate the grid with Cells
    initialize(){
        
    
        for (let r = 0; r < this.rows; r++){
            let row = [];

            for(let c = 0; c < this.cols; c++){
                row.push(new cell_m.Cell(r, c));
            }
            this.grid.push(row);
            
        }
    }
}

module.exports = {
    Board: Board
};