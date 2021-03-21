import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let datas = req.body;

    const competitionId = datas.competitionId;

    let count = await req.db.collection(competitionId).countDocuments({});


    let i = 10;

    let data = [];

    while(i--)
    {

        let x = Math.floor(Math.random() * count);

        let doc = await req.db.collection(competitionId).find({validate: true}).limit(-1).skip(x).next()

        if(doc != null)
        {
            data.push(doc);
        }
        else
        {
            i++
        }
    }


    res.json(data);

});

export default handler;