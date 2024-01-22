class Person {
    /* Gewicht in kg, Größe in m */
    name;
    #gewicht;
    #groesse;
    geschlecht;
    constructor(name, gewichtPar, groessePar, geschlecht) {
        this.name = name;
        this.gewicht = gewichtPar;
        this.groesse = groessePar;
        this.geschlecht = geschlecht;
    }
    get bmi() {
        return Math.round(this.#gewicht/(Math.pow(this.groesse,2))*10)/10;
    }
    gewichtsKlasse(){
        if(this.bmi < 20 - this.geschlecht){
            return `Sie liegen im Untergewicht`;
        }
        if(this.bmi < 25 - this.geschlecht && this.bmi > 20 - geschlecht){
            return `Sie liegen im Normalgewicht`;
        }
        if(this.bmi > 25 - this.geschlecht){
            return `Sie leigen im Übergewicht`;
        }
    }
    set groesse(groessePar) {
        // groesse in m
        try{
        groessePar /= 100;
        if ((groessePar) < 0.5 || (groessePar) > 3) {
            throw new Error('ungültige Größe');
        }
        console.log(groessePar);
        this.#groesse = groessePar;
        }
        catch(e){
            alert(e);
        }
    }
    set gewicht(gewichtPar) {
        // gewicht in kg
        try{
        if (gewichtPar < 1 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
        }
        catch(e){
            alert(e);
        }
    }
    get gewicht() {
        return this.#gewicht;
    }
    get groesse() {
        return this.#groesse;
    } 
    toString() {
        if(this.geschlecht == "0"){ 
            return `Herr ${this.name} wiegt ${this.gewicht} kg und ist ${this.groesse} m groß. ${this.gewichtsKlasse()}`;
        }
        else if(this.geschlecht == "1"){
            return `Frau ${this.name} wiegt ${this.gewicht} kg und ist ${this.groesse} m groß. ${this.gewichtsKlasse()}`;
        }
    }
}
/*
p = new Person('Hans', 80, 1.8);
console.log(p.gewicht);

a = [
    ['Tim', 70, 180],
    ['Branka', 50, 160],
];

b = a.map((arr) => new Person(...arr));
b.forEach((p) => console.log(p.toString()));
*/
function getInfo(id){
    console.log(document.getElementById(`${id}`).value);
    return document.getElementById(`${id}`).value; 
}
function makeClass(){
    let p = new Person(getInfo("name"), getInfo("gewicht"), getInfo("groesse"), gender());
    document.querySelector("#Ergebnis").innerHTML = p.toString();
    console.log(p.toString());
}
function gender(){
    let chosenGender;
    let genders = document.getElementsByName("geschlecht");
    for(let i = 0; i< 2; i++){
        if(genders[i].checked == true){
            chosenGender = genders[i].value;
        }
    }
    return chosenGender;
}
