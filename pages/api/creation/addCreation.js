import {initFirebase} from "../../../Component/firebase/firebase-utils";

function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



export default async function addCreation(req, res){

    let firebase = initFirebase();


    if (req.method === "POST") {

        const { url } = req.body;

        const title = makeid(10);

            firebase.firestore().collection("competition").doc("cyberpunk").collection("creations").doc(title).set({
                name: url,
                state: "CA",
                country: "USA"
            })
                .then((doc) => {

                    firebase.firestore().collection("competition")
                        .doc("cyberpunk")
                        .update({
                            count: firebase.firestore.FieldValue.arrayUnion(title)
                        }).then(r => res.send("Document successfully written!"));



                })
                .catch((error) => {
                    res.status(405).send({success: false, error: {message: 'No blah Found'}});
                });



    }


}