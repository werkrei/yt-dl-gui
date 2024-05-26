const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('urldata',{
    senderUrl: (url) => ipcRenderer.send('urlChannel', url)
    
})

contextBridge.exposeInMainWorld('api', {
    sendData: function(){
        ipcRenderer.send("A")
    },
    receiveData: function(func){
        ipcRenderer.on("D", (event, ...args) => func (event, ...args))
    }
})