import { withIronSession } from "next-iron-session";
import {allUser, signInUser} from "../../../Component/security/controller/security-utils";

const VALID_EMAIL = "tanguy.villiot@gmail.com";
const VALID_PASSWORD = "iticsrcelor";

export default withIronSession(
    async (req, res) => {
        if (req.method === "POST") {
            const { email, password } = req.body;

            let users = await signInUser(email)
                .then(async (result) =>{

                    console.log(result[0].email)

                    if (email === result[0].email && password === result[0].password) {
                        req.session.set("user", { email });
                        await req.session.save();
                        return res.status(201).send("");
                    }
                    else
                    {
                        return res.status(404).send("")
                    }

                });



        }

    },
    {
        cookieName: "MYSITECOOKIE",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production" ? true : false
        },
        password: process.env.APPLICATION_SECRET
    }
)

export async function getServerSideProps(){


    let users = await allUser();

    console.log({users});
    //
    //
    // console.log({data});
    //
    //
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}


