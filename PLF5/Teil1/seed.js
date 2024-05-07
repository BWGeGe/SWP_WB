const { fakerDE, faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
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

    const abteilungArr = await prisma.abteilung.findMany();
    for (let abteilungAktuell of abteilungArr) {
        for (let i = 0; i < fakerDE.number.int({ min: 5, max: 20 }); i++) {
            await prisma.tier.create({
                data: {
                    name: fakerDE.name.firstName(),
                    art: fakerDE.animal[abteilungAktuell.name](),
                    abteilung:
                        { connect: { id: abteilungAktuell.id }, },
                },
            });
        }
    }

    for (let i = 0; i < 100; i++) {
        await prisma.mitarbeiter.create({
            data: {
                name: fakerDE.name.fullName(),
            },
        });
    }
    for (zooAktuell of zoos) {
        const abteilungenZoo = await prisma.abteilung.findMany({
            where: {
                zoo: {
                    id: zooAktuell.id,
                }
            }
        });
        await prisma.mitarbeiter.update({
            data: {
                abteilungen: {
                    id: abteilungenZoo[fakerDE.number.int({ min: 1, max: 4 })]
                }
            },
        });

    }
}

main();