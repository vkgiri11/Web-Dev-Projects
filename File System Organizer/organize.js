let fs = require("fs");
let path = require("path");

let types = {
    media: ["jpg", "jpeg", "bmp", "mp4", "mkv"],
    archives: ["zip", "iso"],
    documents: ["docx", "pdf", "xlsx", "txt"],
    app: ["exe", "pkg"],
};

/*Pass a path to this function. It makes a new dir(name = organized_files) in that given path
In which which it categorizes all the files based on it types and store them in new dir's
Every type will have its own dir inside the organized_files dir.*/
function organizeFn(dirPath) {
    let destPath;
    // Checking File Path and making the parent dir
    if (dirPath == undefined) {
        console.log("Path Not Entered!!!!");
        return;
    } else {
        let doesPathExists = fs.existsSync(dirPath);
        //If the path provided exists
        if (doesPathExists) {
            //*    Make the organized_files dir the path

            //Makes the dest path where the dir will be made
            destPath = path.join(dirPath, "organized_files");
            //Makes the dir only if the dir doesnt already exists
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
        } else {
            console.log("Enter the correct Path!!!");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}
function organizeHelper(src, dest) {
    //*  Identify the types of files present in the input directory

    //Get all the files(this will only get their names not paths)
    let fileNames = fs.readdirSync(src);
    //   console.log(fileNames);
    for (let i = 0; i < fileNames.length; i++) {
        //this will create the file paths.
        //Since all the files are in src only, so we need to just combine the dir name and file name
        let filePaths = path.join(src, fileNames[i]);
        //Check if the path is of file or folder
        let isFile = fs.lstatSync(filePaths).isFile();
        if (isFile) {
            //Get the category of folders in which a particular file will fo
            let category = getCategory(fileNames[i]);
            // console.log(fileNames[i], "belongs to -> ", category);

            //* Cut/copy the files of same types into folders of similar category
            sendFiles(filePaths, dest, category);
        }
    }
}
function getCategory(name) {
    //gets the extension name of the file
    let extension = path.extname(name);
    //slice the extension name from 1....so as the remove the "."
    //.pdf -> pdf OR .txt ->txt
    extension = extension.slice(1);

    for (let i in types) {
        //i iterates overs media, arch, doc and so on....
        let typeArray = types[i];
        //j iterates over the type media array, arch array, doc array and so on....
        for (let j = 0; j < typeArray.length; j++) {
            //if extension matches return its type
            if (extension == typeArray[j]) {
                return i;
            }
        }
    }

    //If no matching type found
    return "others";
}
//srcFile ->file address; dest -> where the file is to be copied; category -> category to which file belongs
function sendFiles(srcFilePath, dest, category) {
    //Make category folders in organized_files dir if it doesnt exists
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    //? To copy a file (OS follows this method) ->
    //? first make a empty copy of file(x) in the dest path
    //? then copy the content of original file into x
    //? To cut a file....after copying just delete the orginal file x

    //this will get the file name from the path
    let fileName = path.basename(srcFilePath);
    //This makes the path of empty copy of the file in its respective folders
    let destFilePath = path.join(categoryPath, fileName);
    //copies the content of the srcfile to destfile
    fs.copyFileSync(srcFilePath, destFilePath);
    //to be used when cutting and pasting file
    //fs.unlinkSync(srcFilePath);
    console.log(fileName, "Copied to", category);
}

module.exports = {
    organizeKey: organizeFn,
};
