import nextConnect from 'next-connect';

import { connectToDatabase } from "../../../Component/bdd/mongodb";

const handler = nextConnect();

handler.post(async (req, res) => {

    let datas = req.body;

    const { db } = await connectToDatabase();


    const competitionId = datas.competitionId;

    let count = await db.collection(competitionId).countDocuments({});


    let i = 12;

    let data = [];


    if(count <= 12)
    {
        i = count
    }

    while(i--)
    {

        let x = Math.floor(Math.random() * count);

        let doc = await db.collection(competitionId).find({validate: true}).limit(-1).skip(x).next()

        if(doc != null)
        {
            data.push(doc);
        }
        else if(data.some(item => doc.user_id === item.user_id))
        {
            i++
        }
        else
        {
            i++
        }
    }


    res.json(data);

});

export default handler;