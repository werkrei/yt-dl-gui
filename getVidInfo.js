const ytdl = require('ytdl-core')
const fs = require('fs')
const { app,ipcRenderer, ipcMain, BrowserWindow} = require('electron')
const path = require('path')
const cacheTime = 864000 * 30
const request = require('request')
const temp = app.getPath("temp")

var ytTitle
var cachedThumb

function getTitle(url){
    return new Promise((resolve) => {
        console.log(url)
        ytdl.getInfo(url).then(info =>{
            console.log('ytTitle being set')
            ytTitle = info.videoDetails.title
            console.log(ytTitle)
            resolve(ytTitle)
        })
    })
}

function getThumb(url){
    return new Promise((resolve) => {
        ytdl.getInfo(url).then(info => {
            var thumbPath = info.videoDetails.thumbnails[3]
            cachedThumb = temp + "/" + info.videoDetails.title + ".png"
            request.head(thumbPath, function(err,res,body){
                request(thumbPath).pipe(fs.createWriteStream(cachedThumb))
            })
             resolve(cachedThumb)   //fs.createWriteStream(thumbPath+".png")
        });
    })
}

module.exports = {
    vidTitle: async function(url){
    return await getTitle(url)
    },
    vidThumb: async function(url){
    return await getThumb(url)
    } 
    
}
