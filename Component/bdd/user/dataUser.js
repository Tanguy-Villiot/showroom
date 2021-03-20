export async function getCreationByCompetition(userId, competitionId){


    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/creation/getCreationbyUserAndCompetition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, competitionId })
    });


    return res.json()

}