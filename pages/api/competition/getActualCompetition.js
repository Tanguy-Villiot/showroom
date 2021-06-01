import nextConnect from 'next-connect';

import { connectToDatabase } from "../../../Component/bdd/mongodb";

const handler = nextConnect();

handler.post(async (req, res) => {

    const { db } = await connectToDatabase();


    let doc = await db.collection("competition").find({enable: true}).toArray(function(err, result) {
        if (err) throw err;

        res.json(result);
    });




});

export default handler;