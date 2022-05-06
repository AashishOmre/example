/**
 * 
 * Name of project : A File System Organizer (Using node.js module)
 * Type : Command Line Project
 */

/**
 * Features of project :
 *   *If you have a lot of files in a folder and they are not properly arranged.
 *    so you can use this tool to arrange them in a directory according to their extension
 *    so at the end you will get organized files in a folder
 * 
 *   *For Example : If you have .txt , .exe and .png files in a folder. you want to arrange them then this 
 *    tool will help you to arrange like .txt file will go to text file Folder. .png will go to images Folder etc.
 */

 const help= require('./help');
 const organize =require('./organize');
 const tree =require('./tree');

 const { organizekey } = require('./organize');
 const { treekey } = require('./tree');
 let input = process.argv.slice(2); //It is an Array of type string. It is used to take input from cmd
 
 let command = input[0];  // tree, organize , help ,any invalid instruction
 
 switch (command) {
 
     case "tree":
         tree.treekey(input[1]);
         break;
     case "organize":
         organize.organizekey(input[1]);
         break;
     case "help":
         help.helpkey();
         break;
     default:
         console.log("PLEASE ENETER A VALID COMMAND");
 }