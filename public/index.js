// let publicAddress = 'http://192.168.100.11:3000';   // home wifi
let publicAddress = 'http://192.168.185.231:3000';   // hotspot

var socket;
socket = io.connect(publicAddress);



let textEle = document.getElementById("text-input");
let colorEle = document.getElementById("selected-color");
let fontEle = document.getElementById("selected-font");

let data = {
    text: textEle.value,
    color: colorEle.innerText,
    font: fontEle.innerText
};


textEle.oninput = () => {
    data = {
        text: textEle.value,
        color: colorEle.innerText,
        font: fontEle.innerText
    };
    socket.emit("input", data)
}

