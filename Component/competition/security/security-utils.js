export default async function checkUser(){

    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res_user = await fetch(`${server}/api/auth/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await res_user.json();

}

export async function checkCreation(userId){


    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/creation/getCreationbyUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });


    return res.json()

}

export async function checkVote(userId){


    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/creation/getVotebyUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });


    return res.json()

}


