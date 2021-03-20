export async function getBestVote(competitionId){

    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/competition/getBestCreation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competitionId })
    });


    return res.json()

}

export async function getActualCompetition(){


    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/competition/getActualCompetition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });


    return await res.json();

}