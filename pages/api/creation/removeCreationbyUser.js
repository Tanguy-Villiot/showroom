/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import nextConnect from 'next-connect';

import { connectToDatabase } from "../../../Component/bdd/mongodb";


const handler = nextConnect();

handler.post(async (req, res) => {

    const { db } = await connectToDatabase();

    let data = req.body;

    data = JSON.parse(data);

    const coll = data.competitionId


    let doc = await db.collection(coll).deleteOne({user_id: data.userId});

    const element = {};


    if(doc.deletedCount === 1)
    {
        console.dir("Creation successfully deleted");

        element.success = true;

        res.json(element);
    }
    else
    {
        console.log("No creation matched the query !")

        element.success = false;

        res.json(element);
    }


});

export default handler;