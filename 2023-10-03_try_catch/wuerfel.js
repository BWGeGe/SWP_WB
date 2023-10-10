let number;
function ParameterGiver(){
    document.getElementById("tabletop").innerHTML= `<button id="dice" onclick="RndNumber('${document.getElementById('guess').value}')"</button>`;
    RndNumber('-1');
}
function RndNumber(thrower){
    console.log('hello');
    try{

        number = Math.ceil(Math.random()*6);
        if( Number(thrower) < 6){            
            document.querySelector("#dice").innerText = number;
            console.log(number);
        }
        else if(Number(thrower) == -1){
            document.querySelector("#dice").innerText = '#';
        }
        else if(Number(thrower) >= 6){
            throw "Fehler";
        }
    }
    catch(err){
        alert("Es gab einen Fehler");
    }
}