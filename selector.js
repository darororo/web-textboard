let focusedMenu = [];
let btnClicked = false; // prevent closeAll function in the document listener to close the menu immediately


// Color Variables
let selectedColor = document.getElementById("selected-color");
let colorOptions = document.querySelectorAll("#color-menu > .option");
let colorBtn = document.getElementById("color-btn");
let colorMenu = document.getElementById("color-menu");
let colorForm = document.getElementById("color-form");

// colorMenu style is empty for some reasons ?
if(colorMenu.style.display == "" ){ colorMenu.style.display = "none"; };

colorBtn.onclick = () => { menuController(colorMenu); };
renderOptions(colorOptions, selectedColor, colorForm);

// Font Variables
let selectedFont = document.getElementById("selected-font");
let fontOptions = document.querySelectorAll("#font-menu > .option");
let fontBtn = document.getElementById("font-btn");
let fontMenu = document.getElementById("font-menu");
let fontForm = document.getElementById("font-form");

// fontMenu style is empty upon started like colorMenu 
if(fontMenu.style.display == "" ){ fontMenu.style.display = "none";};

fontBtn.onclick = () => {menuController(fontMenu); };
renderOptions(fontOptions, selectedFont, fontForm);

// Close select menu when clicking elsewhere not the dropdown buttons
document.addEventListener("click", closeAllSelects);

// set text value
let goBtn = document.getElementById("go-btn"); 
if(goBtn) {
    goBtn.onclick = () => document.getElementById("text-form").value = document.getElementById("text-input").value;
}


function menuController(menu) {
    btnClicked = true;
    if (menu.style.display == "none") {
        menu.style.display = "block";
        if(focusedMenu.length > 0) {
            focusedMenu.pop().style.display = "none";
        }
        focusedMenu.push(menu);
    } else {
        focusedMenu.pop().style.display = "none";
    } 
}

function renderOptions(optionArray, selectedEle, formElement) {
    for(let i = 0; i < optionArray.length; i++) {
        optionArray[i].style.top = (40*i + 1) + "px" ;
        optionArray[i].onclick = () => {
            selectedEle.innerText = optionArray[i].innerText;
            formElement.value = optionArray[i].innerText;
            focusedMenu.pop().style.display = "none";;
        }
    }
}

function closeAllSelects() {
    if (focusedMenu.length > 0 && !btnClicked) { focusedMenu.pop().style.display = "none"; } 
    btnClicked = false;
}

