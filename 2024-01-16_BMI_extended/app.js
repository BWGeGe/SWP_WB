class Person {
    /* Gewicht in kg, Größe in m */
    name;
    #gewicht;
    #groesse;
    geschlecht;
    constructor(name, gewichtPar, groessePar, geschlecht) {
        this.name = name;
        this.gewicht = gewichtPar;
        this.groesse = groesse;
        this.geschlecht = geschlecht;
    }
    get bmi() {
        return Math.round(this.#gewicht/(Math.pow(this.groesse,2))*10)/10;
    }
    gewichtsKlasse(){
        if(this.bmi < 20 - this.geschlecht){
            return `Sie sind im Untergewicht`;
        }
        if(this.bmi < 25 - this.geschlecht && this.bmi > 20 - geschlecht){
            return `Sie sind im Normalgewicht`;
        }
        if(this.bmi > 25 - this.geschlecht){
            return `Sie sind im Übergewicht`;
        }
    }
    set groesse(groessePar) {
        // groesse in m
        groessePar /= 100;
        if ((groessePar) < 0.5 || (groessePar) > 3) {
            throw new Error('ungültige Größe');
        }
        this.#groesse = groessePar;
    }
    set gewicht(gewichtPar) {
        // gewicht in kg
        if (gewichtPar < 1 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht() {
        return this.#gewicht;
    }
    get groesse() {
        return this.#groesse;
    } 
    toString() {
        return `${this.name} wiegt ${this.gewicht} kg und ist ${this.groesse} m groß`;
    }
}

p = new Person('Hans', 80, 1.8);
console.log(p.gewicht);

a = [
    ['Tim', 70, 180],
    ['Branka', 50, 160],
];

b = a.map((arr) => new Person(...arr));
b.forEach((p) => console.log(p.toString()));

function getInfo(){

}