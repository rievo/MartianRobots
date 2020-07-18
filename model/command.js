class Command{
    constructor(initialization_str, movements_str){
        this.initialization_str = initialization_str;
        this.movements_str = movements_str;

        let init_parts = this.initialization_str.split(" ");

        if(init_parts.length != 3){
            throw "not_valid_robot_initialization"
        }

        let movements = this.movements_str.split();
    }
}

module.exports = {
    Command: Command
};