import { withIronSession } from "next-iron-session";
import {signInUser} from "../../../Component/security/controller/security-utils";


async function handler(req, res) {


    if (req.method === "POST") {
        const { email, password } = req.body;

        let users = await signInUser(email)
            .then(async (result) =>{

                if (email === result[0].email && password === result[0].password) {
                    req.session.set("user", {
                        id: result[0]._id,
                        name: result[0].name,
                    });
                    await req.session.save();
                    return res.send("Logged in");
                }

                res.status(404).send({success: false, error: {message: 'No blah Found'}});

            });


    }
}

export default withIronSession(handler, {
    cookieName: "Showroom",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
});

