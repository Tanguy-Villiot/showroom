import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    data = JSON.parse(data);


    let doc = await req.db.collection('vote').insertOne({

        id_creation: data.imageId,
        userId: data.idUser,
        competitionId: data.competitionId

    })

    res.json({message : "OK"});

});

export default handler;