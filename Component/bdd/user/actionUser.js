export async function addVoteUser(idUser, competitionId)
{
    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';


    const res = await fetch(`${server}/api/user/addVote`, {

        method: 'post',

        body: JSON.stringify({idUser, competitionId})

    })
}