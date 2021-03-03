import {initFirebase} from "../../../Component/firebase/firebase-utils";

export default async function addCreation(req, res){

    let firestore = initFirebase().firestore();


    if (req.method === "POST") {

        const { url } = req.body;


            firestore.collection("competition").doc("cyberpunk").collection("creations").doc("thisisthetest").set({
                name: url,
                state: "CA",
                country: "USA"
            })
                .then(() => {
                    res.send("Document successfully written!");
                })
                .catch((error) => {
                    res.status(405).send({success: false, error: {message: 'No blah Found'}});
                });



    }


}