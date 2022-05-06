const fs = require('fs');
const path = require('path');

let types = {               //object of arrays (key : value pair)
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    images: ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "webp", "svg", "PNG"],
    programming: ["c", "c++", "java", "py", "bin", "php", "asm", "class", "js", "html", "css"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"]
};


const { Module } = require("module");
const { FORMERR } = require('dns');

function organizeFn(dirpath) {
    let destpath;                   //Input a directory path  [dirpath]
    if (dirpath == undefined) {
        //check wheather dirpath is exist or not 
        console.log("PLEASE ENTER A VALID DIRECTORY PATH");
        return;                                                              
    }                                                      //    node FO.js oraganize xyx.a
    else {             //if exist            
        let doesExit = fs.existsSync(dirpath);
        if (doesExit == true){
            //check wheather dirpath is valid or not if it is valid create destpath 
            destpath = path.join(dirpath, 'organized_files');
            if (fs.existsSync(destpath) == false) {
                // check wheather dirpath is already exist or not
                fs.mkdirSync(destpath);
            }
            else {
                //If dirpath is already exist
               // console.log("THIS FOLDER ALREADY EXIT");
            }
        }
        else {
            // entered path is invalid
            console.log("PLEASE ENTER A VALID DIRECTORY PATH");
        }
    }
    organizeHelper(dirpath, destpath);
}

// This organizeHelper() function will categorised different files of dirpath 
function organizeHelper(src,des) {

    let children = fs.readdirSync(src);  //get the content/details of src
    // console.log(children);  
    for (let i = 0; i < children.length; i++) {
        let childrenAddress = path.join(src, children[i]);
        let isFile = fs.lstatSync(childrenAddress).isFile();
        // console.log(childrenAddress+" -->"+isFile);
        if (isFile == true) {
            let getCat = getCategory(children[i]);

            sendFiles(childrenAddress,des,getCat); //used to send files to its appropriate folder     
        }
    }

}

// this function gives extension of passed file---> get extension and map with types object's key      
function getCategory(filename) {
    let exe = path.extname(filename);
    // console.log(exe);
    exe = exe.slice(1);

    for (let type in types) {   //for in-->only use for objects
        let ctypes = types[type];
        // console.log(ctypes);
       for (let i = 0; i < ctypes.length; i++) {
            if (ctypes[i] == exe) {
                return type;
            }
        }
    }
    return "others"
}

function sendFiles(srcFilePath , dest , fileCategory){

    let destpath=path.join(dest,fileCategory);   

    if(fs.existsSync(destpath)==false){   //create new directory if it is not available
        fs.mkdirSync(destpath);
        //  console.log(destFilepath);
    }
    else{
       // console.log("THIS FOLDER ALREADY EXITS");
    }

    let filename=path.basename(srcFilePath);       //extract basefile name from path
    let destFilepath=path.join(destpath,filename);  //destination path where files need to be sent
    fs.copyFileSync(srcFilePath,destFilepath);      // files copied

     fs.unlinkSync(srcFilePath);                      //delete files from source
}


module.exports={
    organizekey : organizeFn
    
}

