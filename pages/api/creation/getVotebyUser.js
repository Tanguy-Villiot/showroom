import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;


    let doc = await req.db.collection("vote").findOne({id_user: data.userId});

    console.log(doc);

    const element = {};


    if(!doc)
    {
        element.find = false;

        res.json(element);

    }
    else
    {
        element.find = true;

        res.json(element);
    }



});

export default handler;