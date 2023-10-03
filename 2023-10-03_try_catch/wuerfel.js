let number;
function RndNumber(){
    try{
        number = Math.ceil(Math.random()*6);
        if(number != 6){            
            document.querySelector("#dice").innerText = number;
            console.log(number);
        }
        else if(number == 6){
            throw "Fehler";
        }
    }
    catch(err){
        alert("Es gab einen Fehler");
    }
}