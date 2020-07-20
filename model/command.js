let order_m = require("./order")


class Command{
    constructor(initialization_str, movements_str){
        this.initialization_str = initialization_str;
        this.movements_str = movements_str;

        let init_parts = this.initialization_str.split(" ");

        if(init_parts.length != 3){
            throw "not_valid_robot_initialization"
        }

        
        this.start_col = parseInt(init_parts[0]); //X coordinate
        this.start_row = parseInt(init_parts[1]); //Y coordinate
        
        this.start_direction = init_parts[2];

        //Use this variables to store the current position
        this.current_row = this.start_row;
        this.current_col = this.start_col;

        //Use this variable to store the current direction
        this.current_direction = this.start_direction;

        this.movements = this.movements_str.split("");
 
    }

    //Returns a string encoding the result of the command for that particular grid
    executeOnBoard(board){


        console.log("EXECUTING NEW COMMAND")
        
        //Go through all the movements from the initial position
        for(let i = 0; i < this.movements.length ; i++){
            let current_order_letter = this.movements[i];
            
            let order = order_m.OrderFactory.getOrderOfTypeForCommand(this, current_order_letter);
           
            
            let result = order.applyOnBoard(board);

            if(result.status === "LOST"){
                return "" + this.current_row + " " + this.current_col + " " + this.current_direction + " LOST\n";
            }
        }

        return "" + this.current_row + " " + this.current_col + " " + this.current_direction;

    }



}

module.exports = {
    Command: Command
};