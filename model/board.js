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
        
    
        for (let r = 0; r < this.rows +1; r++){
            let row = [];

            for(let c = 0; c < this.cols+1; c++){
                row.push(new cell_m.Cell(r, c));
            }
            this.grid.push(row);
            
        }
    }

    getCell(row, col){

        return this.grid[row][col]
    }


    checkRowColValid(row, col){
        if(row < 0 || row >= this.cols || col < 0 || col >= this.cols){
            return false;
        }else{
            return true;
        }
    }

    markScent(row, col){
        this.grid[row][col].content = "scent"
    }
}

module.exports = {
    Board: Board
};