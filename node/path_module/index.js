const path = require("path");

console.log("Directory name:", path.dirname(__filename));//o/p : Directory name: C:\Desktop\Backend\node\path_module

console.log("File name", path.basename(__filename));//o/p:File name index.js

console.log("file extension", path.extname(__filename));//o/p: file extension .js

const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path", joinPath);//o/p:Joined path \user\documents\node\projects

const resolvePath = path.resolve("user", "documents", "node", "project");
console.log("Resolve path:", resolvePath);//o/p: Resolve path: C:\Desktop\Backend\node\path_module\user\documents\node\project

const normalizePath = path.normalize("/user/.documents/../node/projects");
console.log("normalizePath", normalizePath);//o/p: normalizePath \user\node\projects