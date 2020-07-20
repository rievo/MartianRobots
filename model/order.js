class Order{
    constructor(parent_command, code){
        this.code = code;
        this.parent_command = parent_command;

        //console.log(this.code)
    }

    applyOnBoard(board){
        throw "do_not_create_basic_orders"
    }
}

class OrderR extends Order{
    constructor(parent_command, code){
        super(parent_command, code);
    }

    applyOnBoard(board){
        //Do the rotation

        if(this.parent_command.current_direction === "N"){
            this.parent_command.current_direction = "E";
        }else if(this.parent_command.current_direction === "E"){
            this.parent_command.current_direction = "S";
        }else if(this.parent_command.current_direction === "S"){
            this.parent_command.current_direction = "W";
        }else if(this.parent_command.current_direction === "W"){
            this.parent_command.current_direction = "N";
        }else {
            throw("command_current_direction_not_valid")
        }
        return {"status":"valid"};
    }
}

class OrderL extends Order{
    constructor(parent_command, code){
        super(parent_command, code);
    }

    applyOnBoard(board){

        //Do the rotation
        if(this.parent_command.current_direction === "N"){
            this.parent_command.current_direction = "W";
        }else if(this.parent_command.current_direction === "W"){
            this.parent_command.current_direction = "S";
        }else if(this.parent_command.current_direction === "S"){
            this.parent_command.current_direction = "E";
        }else if(this.parent_command.current_direction === "E"){
            this.parent_command.current_direction = "N";
        }else {
            throw("command_current_direction_not_valid")
        }

        return {"status":"valid"};
    }
}

class OrderF extends Order{
    constructor(parent_command, code){
        super(parent_command, code);
    }

    applyOnBoard(board){


        //Check if the position that should be occupied by the robot is a possible one
        //i.e. it is inside the grid
        let is_next_position_valid = this.checkValidForDirection(this.parent_command.current_direction, board);

        //If the position is valid, 
        if(is_next_position_valid == true){
            //The robot will not go out of the grid, jut go forward
            this.move(this.parent_command.current_direction)
            return {"status":"valid"}
        }else{//If we apply this movement, the robot would go out of the grid

            //Check if there is a stent on this cell
            if( board.getCell(this.parent_command.current_row, this.parent_command.current_col).content === "scent"){
                //In that case, just ignore the movement
                return {"status":"scent"} 
            }else{
                //Otherwise, mark the scent and return the LOST signal
                board.markScent(this.parent_command.current_row, this.parent_command.current_col) 
                return {"status": "lost"}
            }
        }
        
    }

    checkValidForDirection(dir, board){
        if(dir === "N"){
            return board.checkRowColValid(this.parent_command.current_row +1, this.parent_command.current_col)
        } else if(dir === "W"){
            return board.checkRowColValid(this.parent_command.current_row , this.parent_command.current_col - 1)
        }else if( dir === "S"){
            return board.checkRowColValid(this.parent_command.current_row -1, this.parent_command.current_col)
        }else if(dir === "E"){
            return board.checkRowColValid(this.parent_command.current_row , this.parent_command.current_col +1)
        }
    }

    move(dir){
        if(dir === "N"){
            this.parent_command.current_row = this.parent_command.current_row +1;
        } else if(dir === "W"){
            this.parent_command.current_col = this.parent_command.current_col -1;
        }else if( dir === "S"){
            this.parent_command.current_row = this.parent_command.current_row -1;
        }else if(dir === "E"){
            this.parent_command.current_col = this.parent_command.current_col +1;
        }
    }
}

class OrderFactory{
    constructor(){

    }

    static getOrderOfTypeForCommand(parent_command, type){
        if(type == undefined){
            throw "undefined_type_for_order_creation"
        }

        switch(type){
            case "R":
                return new OrderR(parent_command, type);
            case "L":
                return new OrderL(parent_command, type);
            case "F":
                return new OrderF(parent_command, type);
            default:
                return undefined;
            //TODO: CREATE MORE ORDERS HERE
        }
    }
}

module.exports = {
    Order: Order,
    OrderR: OrderR,
    OrderL: OrderL,
    OrderF: OrderF,
    OrderFactory: OrderFactory
};