class Person {
    /* Gewicht in kg, Größe in m */
    name;
    #gewicht;
    #groesse;
    constructor(name, gewichtPar, groessePar) {
        this.name = name;
        this.gewicht = gewichtPar;
        this.groesse = groessePar;
    }
    get bmi() {
        return Math.round(this.#gewicht/(Math.pow(this.groesse,2))*10)/10;
    }
    set gewicht(gewichtPar) {
        // gewicht in kg
        if (gewichtPar < 1 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    set groesse(groessePar) {
        // groesse in m
        groessePar /= 100;
        if ((groessePar) < 0.5 || (groessePar) > 3) {
            throw new Error('ungültige Größe');
        }
        this.#groesse = groessePar;
    }
    get gewicht() {
        return this.#gewicht;
    }
    get groesse(){
        return this.#groesse;
    }
}
p = new Person('Hans', 80, 145);
p2 = new Person('Dieter', 90, 51);
p3 = new Person('Ulrike', 320, 290);
console.log(`Hallo ${p.name}, mit einem Gewicht von ${p.gewicht}kg und einer Größe von ${p.groesse} haben Sie ein BMI von ${p.bmi}.`);
console.log(`Hallo ${p2.name}, mit einem Gewicht von ${p2.gewicht}kg und einer Größe von ${p2.groesse} haben Sie ein BMI von ${p2.bmi}.`);
console.log(`Hallo ${p3.name}, mit einem Gewicht von ${p3.gewicht}kg und einer Größe von ${p3.groesse} haben Sie ein BMI von ${p3.bmi}.`);



