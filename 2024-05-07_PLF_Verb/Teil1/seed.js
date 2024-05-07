const { fakerDE, faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    console.log('Start seeding ...');
    console.log('Seeding zoos ...');
    for (let i = 0; i < 5; i++) {
        await prisma.zoo.create({
            data: {
                land: fakerDE.location.country(),
                stadt: fakerDE.location.city(),
                adresse: fakerDE.location.streetAddress(),
                baujahr: fakerDE.number.int({ min: 1800, max: 2024 }),
            },
        });
    }
    console.log('Seeding abteilungen ...');

    const zoos = await prisma.zoo.findMany();
    for (zooAktuell of zoos)
        for (let i = 0; i < fakerDE.number.int({ min: 2, max: 7 }); i++) {
            await prisma.abteilung.create({
                data: {
                    name: fakerDE.animal.type(),
                    zoo:
                        { connect: { id: zooAktuell.id }, },
                },
            });
        }
    console.log('Seeding tiere ...');

    const abteilungArr = await prisma.abteilung.findMany();
    for (let abteilungAktuell of abteilungArr) {
        for (let i = 0; i < fakerDE.number.int({ min: 5, max: 20 }); i++) {
            await prisma.tier.create({
                data: {
                    name: fakerDE.person.firstName(),
                    art: fakerDE.animal[abteilungAktuell.name](),
                    abteilungen:
                        { connect: { id: abteilungAktuell.id }, },
                },
            });
        }
    }
    console.log('Seeding mitarbeiter ...');

    for (let i = 0; i < 100; i++) {
        await prisma.mitarbeiter.create({
            data: {
                name: fakerDE.person.firstName(),
            },
        });
        const abteilungenZoo = await prisma.abteilung.findMany({
            where: {
                zoo: {
                    id: zoos[fakerDE.number.int({min:0, max: zoos.length -1})].id,
                }
            }
        });
        const mitArbeiterArr = await prisma.mitarbeiter.findMany();
            for(let j = 0; j < fakerDE.number.int({ min: 1, max: 3 }); j++){
        await prisma.mitarbeiter.update({
            data: {
                abteilungen: {
                    connect: abteilungenZoo[fakerDE.number.int({ min: 0, max: 4 })],
                },
            },
            where: {
                id: mitArbeiterArr[i].id
            }
        });}
    }
}

main().then(console.log("seeding done")).catch(console.error).finally(async () => {
    await prisma.$disconnect();
});
