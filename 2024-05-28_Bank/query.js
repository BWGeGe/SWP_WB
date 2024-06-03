const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
prisma = new PrismaClient();

async function main(){
    const allAccounts = await prisma.account.findMany({
        select: {
            id: true
        }
    });
    for (let currentAccount of allAccounts) {
        const losingAmount = await prisma.transaction.findMany({
            select: {
                amount: true
            },
            where: {
                fromAcc: currentAccount.id
            }
        });
        const gainingAmount = await prisma.transaction.findMany({
            select: {
                amount: true
            },
            where: {
                toAcc: currentAccount.id
            }
        });
        let balance = Math.round((gainingAmount.reduce((a, b) => a + b.amount, 0) - losingAmount.reduce((a, b) => a + b.amount, 0)) * 100) / 100;
        console.log(`Account with ID ${currentAccount.id} has a balance of ${balance}`);
    }
}
main().then(() => {
    console.log('query complete');
});
