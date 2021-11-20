#!/usr/bin/env node
//The above line tells your OS that in which environment the script should be run

let helpObj = require("./help");
let treeObj = require("./tree");
let organizeObj = require("./organize");

//takes input from command line
//the user input starts from 2nd index
//node fileName.js takes pos 0 and 1
let inputArr = process.argv.slice(2);
// console.log(inputArr);

let command = inputArr[0];
switch (command) {
    case "tree":
        //Passing the directory Path to fn
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        //Passing the directory Path to fn
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please Input Right Command");
        break;
}
