import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {




    let doc = await req.db.collection("competition").find({enable: true}).toArray(function(err, result) {
        if (err) throw err;

        res.json(result);
    });




});

export default handler;