// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
window.addEventListener('keydown',(event:KeyboardEvent)=>{
    if(event.keyCode === 123){
        ipcRenderer.send("toggle-devtools",true);
    }

    if(event.keyCode === 116){
        ipcRenderer.send("refresh-ignore-cache",true);
    }
});

//angular application
require('./app/app.bootstrap');
