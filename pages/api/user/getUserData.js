/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/database_user';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;

    let doc = await req.db.collection("user").find({email: data.email}).toArray(function(err, result) {
        if (err) throw err;

        res.json(result);
    });




});

export default handler;