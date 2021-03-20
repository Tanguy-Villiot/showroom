import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    await req.db.collection(data.competitionId).find().sort({countVote: -1}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        res.json(result);
    });




});

export default handler;