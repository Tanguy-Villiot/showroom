import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';
import mongo from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    data = JSON.parse(data);



    let doc = await req.db.collection(data.competitionId).updateOne({_id: new mongo.ObjectID(data.imageId)}, {$inc: {countVote: 1 }})

    res.json({message : "OK"});

});

export default handler;