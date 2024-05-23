// get url parameter values
let url = window.location.href;
let searchParams = new URL(url).searchParams;
let entries = new URLSearchParams(searchParams);

document.getElementById("text-input").value = searchParams.get("text");
document.getElementById("color-input").innerHTML = searchParams.get("color");
document.getElementById("font-input").innerHTML = searchParams.get("font");

