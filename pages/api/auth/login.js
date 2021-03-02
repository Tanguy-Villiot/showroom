import { withIronSession } from "next-iron-session";
import {initFirebase} from "../../../Component/firebase/firebase-utils";


async function handler(req, res) {

    let firestore = initFirebase().firestore();


    if (req.method === "POST") {
        const { email, password } = req.body;

        firestore.collection("user").where("email", "==", email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots

                    if (password === doc.data().password) {
                        req.session.set("user", {
                            id: "123456789",
                            name: doc.data().name,
                        });
                        await req.session.save();
                        return res.send("Logged in");
                    }

                    res.status(404).send({success: false, error: {message: 'No blah Found'}});

                });
            })
            .catch((error) => {
                console.log(error)
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

