const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
prisma = new PrismaClient();

async function main(){
    console.log('Start seeding ...');
for (let i = 0; i < 10; i++) {
   const bankCreate = await prisma.bank.create({
       data:{
           bic: faker.finance.bic(),
    }
   });
}
const bankIDs = await prisma.bank.findMany({
    select: {
        id: true
    }
});
console.log(bankIDs);
for (let i = 0; i < 10; i++) {
   const accountCreate = await prisma.account.create({
       data:{
           iban: faker.finance.iban(),
           bank: {
               connect: {
                   id: bankIDs[faker.number.int({min: 0, max: bankIDs.length -1})].id
               }
           }
    }
   });
}
const accountIDs = await prisma.account.findMany({
    select: {
        id: true
    }
});
for (let i = 0; i < 10; i++) {
   const customerCreate = await prisma.customer.create({
       data:{
           name: faker.person.fullName(),
           email: faker.internet.email(),
           accounts: {
               connect: {
                   id: accountIDs[faker.number.int({min: 0, max: accountIDs.length -1})].id
               }
           },
    }
   });
}
for(let i = 0; i < 10; i++){
    const transactionCreate = await prisma.transaction.create({
        data:{
            verwendungszweck: faker.finance.transactionDescription(),
            amount: Math.round(faker.number.float({min: 0, max: 1000})*100)/100,
            date: faker.date.recent(),
            toAcc: accountIDs[faker.number.int({min: 0, max: accountIDs.length -1})].id,
            fromAcc: accountIDs[faker.number.int({min: 0, max: accountIDs.length -1})].id
        }
    });
}
}
main().catch((e) => {
    throw e;
}).finally(async () => {
    console.log('Seeding finished.');
    await prisma.$disconnect();
});
