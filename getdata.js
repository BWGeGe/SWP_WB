/*ToDo*/
let file = "currencies.json";
async function showResult(money){
        const response = await fetch('https://innolab.spengergasse.at/misc/swp/currencies.json');
        const jsonData = await response.json();
        document.getElementById("place").innerHTML = "";
        for(zeile of jsonData)
        {
            if(zeile && zeile !="")
            {
                document.getElementById("place").innerHTML += `<li onclick="selectItem(this)">${zeile.currency} : ${ zeile.rate *money}</li>`; 
            }
        }
}
function selectItem(curr){ //Prof. Kulha Variante
    console.log(curr);
    document.getElementById("place").innerHTML = "";
    document.getElementById("place").innerHTML = `${curr}`;
}