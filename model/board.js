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

    getCell(row, col){

        return this.grid[row][col]
    }


    checkRowColValid(row, col){
        if(row < 0 || row >= this.rows || col < 0 || col >= this.cols){
            return false;
        }else{
            return true;
        }
    }

    markScent(row, col){
        this.getCell(row, col).content = "scent"
    }

    display(robot_row, robot_col, dir, order){

        let str = "";
        str = str + "___ order : "+ order +"________\n"
        for(let r = this.grid.length -1; r >=0; r--){
            str = str + r + " |"
            for(let c = 0; c < this.grid[0].length; c++){

                if(this.getCell(r,c).content == "scent" && robot_row == r && robot_col == c){
                    str = str + "!"
                }else if(this.getCell(r,c).content == "scent"){
                    str = str + "X"
                }else if(robot_row == r && robot_col == c){
                    
                    if(dir === "N"){
                        str = str + "n"
                    }else if(dir === "E"){
                        str = str + "e"
                    }else if(dir === "S"){
                        str = str + "s"
                    }else if(dir === "W"){
                        str = str + "w"
                    }
                }else{
                    str = str + " "
                }
                str = str + "|"
            }
            str = str + "<-\n"
        }
        str = str + "   "
        for(let i =0 ; i < this.cols; i++){
            str = str  + i + "|"
        }
        str = str + "\n######################\n\n"
        return str;
    }
}

module.exports = {
    Board: Board
};