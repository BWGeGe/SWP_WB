"use strict";
class Person  {
    name;
    #gewicht;
    groesse;

    constructor(name, gewicht, groesse) {
        this.name = name;
        this.gewicht = gewicht;
        this.groesse = groesse;
    }

    get bmi() {}

    set gewicht(gewichtPar){
        if(gewichtPar < 1 || gewichtPar > 500){
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht(){
        return this.#gewicht;
    }
}
let p = new Person('Hans', 80, 1.8);
console.log(p.gewicht);





