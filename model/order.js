class Order{
    constructor(parent_command, code){
        this.code = code;
        this.parent_command = parent_command;

        console.log(this.code)
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

        

        //TODO: Check if the current position has the scent.
        //In that case, ignore this application
        
        if(this.parent_command.current_direction === "N"){

            //If the target position is valid,
            if(board.checkRowColValid(this.parent_command.current_row +1, this.parent_command.current_col) == true){

                //Apply the movement
                this.parent_command.current_row = this.parent_command.current_row + 1;

                //Return the application
                return {"status":"valid"}
            }else{


                if(board.getCell(this.parent_command.current_row, this.parent_command.current_col).content === "scent"){
                    //The cell has a scent, ignore the movement
                    return {"status":"valid"}
                }else{
                    //Do not move the rover and mark the cell
                    board.markScent(this.parent_command.current_row, this.parent_command.current_col)          
                    return {"status":"LOST"}
                }
                
            }
        } else if( this.parent_command.current_direction === "W"){
            //If the target position is valid,
            if(board.checkRowColValid(this.parent_command.current_row , this.parent_command.current_col +1) == true){

                //Apply the movement
                this.parent_command.current_col = this.parent_command.current_col + 1;

                //Return the application
                return {"status":"valid"}
            }else{

                if(board.getCell(this.parent_command.current_row, this.parent_command.current_col).content === "scent"){
                    //The cell has a scent, ignore the movement
                    return {"status":"valid"}
                }else{
                    //Do not move the rover and mark the cell
                    board.markScent(this.parent_command.current_row, this.parent_command.current_col)          
                    return {"status":"LOST"}
                }
            }
        }else if( this.parent_command.current_direction === "S"){
            //If the target position is valid,
            if(board.checkRowColValid(this.parent_command.current_row -1, this.parent_command.current_col) == true){

                //Apply the movement
                this.parent_command.current_row = this.parent_command.current_row - 1;

                //Return the application
                return {"status":"valid"}
            }else{

                if(board.getCell(this.parent_command.current_row, this.parent_command.current_col).content === "scent"){
                    //The cell has a scent, ignore the movement
                    return {"status":"valid"}
                }else{
                    //Do not move the rover and mark the cell
                    board.markScent(this.parent_command.current_row, this.parent_command.current_col)          
                    return {"status":"LOST"}
                }
            }
        }else if( this.parent_command.current_direction === "E"){
            //If the target position is valid,
            if(board.checkRowColValid(this.parent_command.current_row , this.parent_command.current_col - 1) == true){

                //Apply the movement
                this.parent_command.current_col = this.parent_command.current_col - 1;

                //Return the application
                return {"status":"valid"}
            }else{

                
                if(board.getCell(this.parent_command.current_row, this.parent_command.current_col).content === "scent"){
                    //The cell has a scent, ignore the movement
                    return {"status":"valid"}
                }else{
                    //Do not move the rover and mark the cell
                    board.markScent(this.parent_command.current_row, this.parent_command.current_col)          
                    return {"status":"LOST"}
                }
            }
        }


        return {"status":"unknown"}

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