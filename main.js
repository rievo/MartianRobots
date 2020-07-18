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

    if(input_str == undefined || input_str.length < 1){
        throw "not_valid_input"

    }


    let lines = input_str.split("\n");

    //Extract the basic size info from the provided data
    let grid_size_info = lines.shift().split(" ")

    if(grid_size_info.length != 2){
        throw "grid_size_not_valid"
    }

    //Extract the rows and columns
    let grid_width = grid_size_info[0]
    let grid_height = grid_size_info[1];

    console.log("Grid size: " + grid_height + " rows, " + grid_width + " cols")

    //Create an empty baord with the desired size
    let board = new board_m.Board(grid_height, grid_width);


    let command_list = [];

    //Now go through all the commands
    for(let i = 0; i < lines.length - 1; i = i+2){
        let robot_start_str = lines[i].trim();
        let robot_movements_str = lines[i+1].trim();

        let command = new command_m.Command(robot_start_str, robot_movements_str)
        command_list.push(command);
    }
    
    console.log(command_list)



}


