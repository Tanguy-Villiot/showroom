import { ironSession } from "next-iron-session";
import nextConnect from "next-connect";

const session = ironSession({
    cookieName: "Showroom",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
});

const handler = nextConnect();

handler.use(session).get((req, res) => {

    const x = req.session.get("user");

    const element = {};

    if(!x)
    {

        element.connected = false;


        res.status(404).send(element);
    }
    else
    {
        element.connected = true;
        element.user = x;


        res.json(element);
    }


});

export default handler;