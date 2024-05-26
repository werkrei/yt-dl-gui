const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('node:path')
const down = require('./downloadVideo')
const {vidTitle, vidThumb} = require('./getVidInfo')


var downLink
var win
var title
var vidthumb
titlenthumb = new Array
//ipcMain.on('thumbChannel', (event, link) => {vidThumb(link); console.log(vidThumb(link) + 'thumb')})

async function asyncSet(x){
    title = await vidTitle(x)
    vidthumb = await vidThumb(x)
    titlenthumb = [title, vidthumb]
    win.webContents.send("D", titlenthumb)
}
const createWindow = () => {
     win = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        frame: false,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
      }

app.whenReady().then(() => {
    createWindow()
    console.log('how')
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on('urlChannel', (event, link) => {if(event = "click"){downLink = link; console.log(downLink); down.down(link)}})
  ipcMain.on('urlChannel', (event, link) => {downLink = link; /*console.log(downLink + 'received');*/})

  ipcMain.on("A", (evt) =>{
    console.log(downLink+"  yes")

    asyncSet(downLink)

  })