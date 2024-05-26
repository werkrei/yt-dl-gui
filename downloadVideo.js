const ytdl = require('ytdl-core')
const fs = require('fs')
const {app} = require('electron')

const downloadsFolder = app.getPath("downloads")


module.exports = {
  down: function downloadVideo(url) {
    if (ytdl.validateURL(url)){
      console.log("Starting download of " + url)
      ytdl.getInfo(url).then(info => {
        var title = info.videoDetails.title
        ytdl(url)
          .pipe(fs.createWriteStream(downloadsFolder +"/"+title + '.mp4'))
      })
      }
    //ytdl(url)
      //.pipe(fs.createWriteStream('video.mp4'))
    }
  }