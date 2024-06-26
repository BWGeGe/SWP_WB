const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let userNametemp;
let trackNametemp;

if (process.argv.length != 4) {
    console.log('no specific action provided, exiting');
    process.exit(1);
}

console.log(process.argv.at(-2));

if(process.argv.at(-2) == 'u') {
userNametemp = process.argv.at(-1).trim();
if (!userNametemp) {
    console.log('empty username provided, exiting');
    process.exit(1);
}
}

if(process.argv.at(-2) == 't') {
trackNametemp = process.argv.at(-1).trim();
if (!trackNametemp) {
    console.log('empty trackname provided, exiting');
    process.exit(1);
}
}

const userName = userNametemp;
const trackName = trackNametemp;

async function getWatchlistNamesForUser(userName) {
    return await prisma.watchlist.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            benutzer: {
                fullname: userName,
            },
        },
    });
}
async function tracksFromWatchlist(id) {
    return await prisma.track.findMany({
        where: {
            watchLists: {
                some: { id: id },
            },
        },
    });
}

async function userFromTrackName(trackName) {
    return await prisma.benutzer.findMany({
        where: {
            watchLists: {
                some: {tracks: { some: {name: trackName},},},
            },
        },
    });  
}
async function main() {
if(userName != undefined) {
    const lists = await getWatchlistNamesForUser(userName);
    for (let wl of lists) {
        const tracks = await tracksFromWatchlist(wl.id);
        console.log(
            `${userName}'s Watchlist ${wl.name} ... ${tracks.length} tracks`
        );
        for (let t of tracks) {
            console.log(`${t.name} by ${t.artist} (${t.duration} secs)`);
        }
    }
}
if(trackName != undefined) {
    const users = await userFromTrackName(trackName);
    for(let user of users) {
        console.log(`User ${user.fullname} has Track ${trackName} on his Watchlist`); } }
}
main();
