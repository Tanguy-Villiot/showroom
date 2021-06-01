import checkServer from "../checkServer";

export async function voteForCreation(imageId, competitionId)
{
    const server = checkServer();

    const res = await fetch(`${server}/api/creation/voteCreation`, {

        method: 'post',

        body: JSON.stringify({imageId, competitionId})

    })
}


export async function removeCreation(userId, competitionId)
{
    const server = checkServer();

    const res = await fetch(`${server}/api/creation/removeCreationbyUser`, {

        method: 'post',

        body: JSON.stringify({userId, competitionId})

    })

    return res.json();
}