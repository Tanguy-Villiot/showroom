import { withIronSession } from "next-iron-session";
import {useContext} from "react";
import nextConnect from 'next-connect';

import middleware from '../../../Component/bdd/database_user';


const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const { id, psdw } = req.body;

    let doc = await req.db.collection("user").findOne({ email: id });

    if(req.body.social)
    {
        req.session.set("user", {
            id: doc._id,
            name: doc.name,
            surname: doc.surname,
            pseudo: doc.pseudo,
            email: id
        });
        await req.session.save();

        res.send("Logged in");
    }
    else
    {
        if(psdw === doc.password)
        {


            req.session.set("user", {
                id: doc._id,
                name: doc.name,
                surname: doc.surname,
                pseudo: doc.pseudo,
                email: id
            });
            await req.session.save();

            res.send("Logged in");
        }
        else
        {
            res.statusMessage = "psdw"
            res.send("psdw");
        }
    }







});

export default withIronSession(handler, {
    cookieName: "Showroom",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
});



