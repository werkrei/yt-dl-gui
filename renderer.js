window.onload = (event) => {
    alert('loaded')
}

document.getElementById("button").addEventListener('click', function (){
    var link = document.getElementById("juicy").value
    alert(link)
    try {
        window.urldata.senderUrl(link)
    } catch (error) {
        alert(error)
    }
})
function send(str){
    alert(str)
}