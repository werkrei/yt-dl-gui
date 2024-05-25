const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('urldata',{
    senderUrl: (url) => ipcRenderer.send('urlChannel', url)
})