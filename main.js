const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('node:path')
const down = require('./downloadVideo')

let downLink = ""

ipcMain.on('urlChannel', (event, link) => {downLink = link; console.log(downLink); down.down(link)})

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
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