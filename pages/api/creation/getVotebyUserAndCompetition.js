import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    let doc = await req.db.collection("vote").findOne({competitionId: data.competitionId, userId: data.userId});

    const element = {};


    if(!doc)
    {
        element.find = false;

        res.json(element);

    }
    else
    {
        element.find = true;
        element.creation = doc;

        res.json(element);
    }



});

export default handler;