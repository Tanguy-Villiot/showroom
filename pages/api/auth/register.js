import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/database_user';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    data = JSON.parse(data);

    console.log(data);



    let doc = await req.db.collection('user').insertOne({

        name: data.value.name,
        surname: data.value.surname,
        pseudo: data.value.pseudo,
        email: data.value.email,
        password: data.value.psdw,
        register : new Date(Date.now()),
        participation: []

    })

    res.json({message : "OK"});

});

export default handler;