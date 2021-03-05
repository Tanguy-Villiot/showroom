import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    data = JSON.parse(data);


    let doc = await req.db.collection('creation').insertOne({

        url: data

    })

    res.json({message : "OK"});

});

export default handler;