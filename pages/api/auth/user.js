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


        console.log(element);

        res.json(element);
    }
    else
    {
        element.connected = true;
        element.user = x;

        console.log(element);


        res.json(element);
    }


});

export default handler;