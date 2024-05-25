function sendData(){
    console.log('button clicked')
    ipcRenderer.send("newData", {value: document.getElementById('juicy').value})
}