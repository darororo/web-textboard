// get url parameter values
let url = window.location.href;
let searchParams = new URL(url).searchParams;
let entries = new URLSearchParams(searchParams);

document.getElementById("text-input").value = searchParams.get("text");
document.getElementById("selected-color").innerHTML = searchParams.get("color");
document.getElementById("selected-font").innerHTML = searchParams.get("font");

