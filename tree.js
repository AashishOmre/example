//Tree Function
const fs = require('fs');
const path = require('path');

function treeFn(dirpath){
  
    if(dirpath==undefined){
        console.log("ENTER A VALID DIRECTORY PATH");
    }
    else{
        let doesExit = fs.existsSync(dirpath);
        if(doesExit==true){
            treeHelper(dirpath," ");
        }
    }
}

function treeHelper(targetpath , indent){

    let isFile=fs.lstatSync(targetpath).isFile();
    if(isFile== true){                     
    //   console.log(indent+"├──"+filename);  
    //     console.log(indent+"├──"+filename);  
        let filename = path.basename(targetpath); //if targetpath is file just print with ├──file name
        console.log(indent+"├──"+filename);  
    } 
    else{                                           //if targetpath is folder check its children and again 
                                                    //       perform same work for them
        let dirname = path.basename(targetpath);
        console.log(indent+"└──"+dirname);
        let children = fs.readdirSync(targetpath);
        // console.log(children);
        for(let i=0;i<children.length;i++){
           let childpath=path.join(targetpath,children[i]);
           treeHelper(childpath , indent+"\t");
        }

    }   
}

module.exports={
    treekey : treeFn
    
}