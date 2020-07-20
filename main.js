let fs = require('fs')
let test_data_path = "./data/sampleinput1.txt"

let board_m = require("./model/board")
let command_m = require("./model/command")

//Separated to control the init point
initEverything();

function initEverything(){
    
    //Load the test data
    fs.readFile(test_data_path, 'utf8', function(err, data) {
        if (err) throw err;
        onInputRead(data.replace("\r\n", "\n"))
        
    });
}

function onInputRead(input_str){

    //INFO: Check if the input string is valid
    if(input_str == undefined || input_str.length < 1){
        throw "not_valid_input"
    }


    let lines = input_str.split("\n");

    //Extract the basic size info from the provided data
    let grid_size_info = lines.shift().split(" ")

    //Check if the right parameters for the size have been provided
    if(grid_size_info.length != 2){
        throw "grid_size_not_valid"
    }

    //Extract the rows and columns
    //IMPORTANT: Use parseInt for casting to integers
    let grid_width = parseInt(grid_size_info[0]) +1; //+1 because coordinates are provided instead of plain size
    let grid_height = parseInt(grid_size_info[1]) +1;


    //Create an empty baord with the desired size
    let board = new board_m.Board(grid_height, grid_width);


    //Try to execute the list of commands
    try{
        let command_list = [];

        //Now go through all the commands
        for(let i = 0; i < lines.length - 1; i = i+2){

            //Extract the start position and the list of movements as strings
            let robot_start_str = lines[i].trim();
            let robot_movements_str = lines[i+1].trim();
    
            //Check the length of the movements string
            if(robot_movements_str.length >= 100){
                throw "instruction_string_greater_than_100_chars"
            }
    
            //Create the command instance to be later executed
            let command = new command_m.Command(robot_start_str, robot_movements_str)
            command_list.push(command);
        }
        
        
        //Once the right commands were created, execute them one by one
        for(let i = 0; i < command_list.length; i++){
            let str = command_list[i].executeOnBoard(board);
            console.log(str);
        }
    }catch(e){
        console.log(e);
    }

  



}


