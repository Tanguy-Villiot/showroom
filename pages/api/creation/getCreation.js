import {initFirebase} from "../../../Component/firebase/firebase-utils";

let firebase = initFirebase();


let randomList = function (arr, n)
{
    return new Promise(function (resolve, reject) {


        let result = [],
            len = arr.length,
            taken = new Array(len);
        if (n > len)
        {
            result = arr;
        }
        else
        {
            while (n--) {
                let x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
        }

        if(result.length === 0)
        {
            reject("List is empty");
        }
        else
        {
            resolve(result);
        }
    })
}

const getItems = async (item_ids) => {


    let itemRefs = item_ids.map(id => {
        return firebase.firestore()
            .collection("competition")
            .doc("cyberpunk")
            .collection("creations").doc(id).get();
    });


    return Promise.all(itemRefs)
        .then(docs => {
            let x = [];
            docs.map(doc => x.push(doc.data()));

            return x;
        })
        .catch(error => console.log(error))
}


export default async function handler(req, res) {


    let oui = [];

    const snapshot = await firebase.firestore()
        .collection("competition")
        .doc("cyberpunk")
        .get()
        .then((doc) => {

            let x = doc.data().count;

            randomList(x, 10)
                        .then(result => {



                            oui = result;



                        });



        })



    const resu = await getItems(oui);


    console.log(resu)

    res.status(200).json(JSON.stringify(resu))


}