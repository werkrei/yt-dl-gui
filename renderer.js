window.onload = (event) => {
}
function replaceInfo(array){
document.getElementById('thumbn').src=array[1]
document.getElementById('vidtitle').innerHTML=array[0]
}

var ytTitle
var ytThumb
var link
document.getElementById("button").addEventListener('click', function (){
     link = document.getElementById("juicy")
    try {
        window.urldata.senderUrl(link)
    } catch (error) {
        alert(error)
    }
})

document.getElementById("juicy").addEventListener('change', function (){
link = document.getElementById("juicy").value
window.urldata.senderUrl(link)
window.api.sendData()
window.api.receiveData((events, data) => {
    replaceInfo(data)
    })
})

