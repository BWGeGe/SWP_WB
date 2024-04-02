"use strict";

const ul = document.getElementById("meineUL");
5
function addElement() {
    const li = document.createElement("li");
    li.innerHTML = document.getElementById("Text").value;
    if(document.getElementById("Text").value == ""){
        li.innerHTML = "list item";
    }
    ul.appendChild(li);
}
