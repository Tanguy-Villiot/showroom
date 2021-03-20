export async function voteForCreation(imageId, competitionId)
{
    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';


    const res = await fetch(`${server}/api/creation/voteCreation`, {

        method: 'post',

        body: JSON.stringify({imageId, competitionId})

    })
}