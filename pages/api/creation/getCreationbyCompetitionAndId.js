/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/databse';
import mongo from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    let data = req.body;


    let doc = await req.db.collection(data.idCompetition).findOne({_id: new mongo.ObjectID(data.idCreation)});

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
        element.creation = doc;

        res.json(element);
    }



});

export default handler;