const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
let zoos = await prisma.zoo.findMany({
    select: {
        stadt: true,
    },
},
);

for(let zoo of zoos) {
    console.log(zoo.stadt);
}

let zooInfo = await prisma.zoo.findUnique({
    where: {
        id: 'clvw6q9vl0002qulzi8wfa245',
    },
    select: {
        land: true,
        stadt: true,
        adresse: true,
        baujahr: true,
        abteilungen: {
            select: {
                name: true,
                tiere: {
                    select: {
                    _count: {
                    select: {
                        name: true,
                    },
                    },
                },
                },
            },
        },
    },
});
console.log("Zoo Info:\n\n");
console.log(zooInfo.land,zooInfo.stadt, zooInfo.adresse, zooInfo.baujahr);
console.log("Abteilungen:");
for( abteilung of zooInfo.abteilungen){
    console.log(abteilung.name);
    console.log("Tiere:");
    for(tier of abteilung.tiere){
        console.log(tier.name);
    }
}
const mitArbeiterZoo = await prisma.mitarbeiter.findMany({
    select: {
        name: true,
        abteilungen: {
            select: {
                name: true,
                zoo: {
                    select: {
                        id: true,
                    },
                },
            },
        },
    },
    where: {
        abteilungen:
        {
            some: {
                zoo: {
                    id: 'clvw6q9vl0002qulzi8wfa245',
                },
            },
        },
    },
});

console.log("Mitarbeiter im Zoo:\n\n");
for(let mitArbeiter of mitArbeiterZoo){
    console.log(mitArbeiter.name + ` arbeitet in der/den Abteilung/en:`);
    mitArbeiter.abteilungen.forEach(abteilung => {
        console.log("\t"+abteilung.name);
    });
}
}

main();
