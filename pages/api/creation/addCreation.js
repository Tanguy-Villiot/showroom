import nextConnect from 'next-connect';

import { connectToDatabase } from "../../../Component/bdd/mongodb";
import checkServer from "../../../Component/bdd/checkServer";

const handler = nextConnect();

handler.post(async (req, res) => {

    const { db } = await connectToDatabase();

    let data = req.body;

    data = JSON.parse(data);


    const fetchCompetition = async () => {

        const server = checkServer();

        const res = await fetch(`${server}/api/competition/getActualCompetition`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }


    fetchCompetition()
        .then(async result => {

            const competitionId = result[0]._id;


            let doc = await db.collection(competitionId).insertOne({

                url: data.url,
                user_id: data.userId,
                competition_id: competitionId,
                title: data.valueForm.title,
                description: data.valueForm.description,
                publish: new Date(Date.now()),
                countVote: 0

            })

            res.json({message : "OK"});

        })



});

export default handler;