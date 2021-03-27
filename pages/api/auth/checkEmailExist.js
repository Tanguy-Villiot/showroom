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

    data = JSON.parse(data);

    console.log(data.email)

    let doc = await req.db.collection("user").findOne({email: data.email});

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