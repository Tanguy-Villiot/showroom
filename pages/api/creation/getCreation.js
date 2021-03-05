import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {


    let count = await req.db.collection('creation').countDocuments({});


    let i = 10;

    let data = [];

    while(i--)
    {

        let x = Math.floor(Math.random() * count);

        let doc = await req.db.collection("creation").find().limit(-1).skip(x).next()

        data.push(doc);
    }






    console.log(data)
    res.json(data);

});

export default handler;