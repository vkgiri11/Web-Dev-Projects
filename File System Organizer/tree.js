let fs = require("fs");
let path = require("path");

/* Pass a path to this func, it will prints all its files and folders */
function treeFn(dirPath) {
    if (dirPath == undefined) {
        //If no path is passed, call the tree func on the directory in which the cmd line is runnning
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesPathExists = fs.existsSync(dirPath);
        //If the path provided exists
        if (doesPathExists) {
            treeHelper(dirPath, "");
        } else {
            console.log("Enter the correct Path!!!");
            return;
        }
    }
}
function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + " |---- " + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "↳-----" + dirName);
        //Get all dir names inside of dirPath
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            //get the childPath of the children dir
            let childPath = path.join(dirPath, childrens[i]);
            //call recursive function to print the files of each children folders
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn,
};
