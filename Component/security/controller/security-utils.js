// mongodb+srv://alanTuring:<password>@clusterturing.qxwd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
import mongo from "mongodb";

let databaseUrl = process.env.MONGODB_URI_USER;

// if(process.env.ENV === "local"){
//     databaseUrl = process.env.MONGODB_URI_LOCAL;
// } else {
//     databaseUrl = process.env.MONGODB_URI_DEV;
// }

const options = { useNewUrlParser: true, useUnifiedTopology: true };


export function initDatabase(){
    return new Promise((resolve, reject) => {
        mongo.MongoClient.connect(databaseUrl, options, (error, client) => {
            if (error) {
                console.log("ERROR OUPS");
                reject(error);
            } else {
                resolve(client);
            }
        });
    });
}



export async function allUser(){
    let client = await initDatabase()
    let db = await client.db()

    return db.collection("user").find().toArray()
}

export async function voteOfDiscussion(discussion_id){
    let client = await initDatabase()
    let db = await client.db()

    return db.collection("votes").find({discussion_id: discussion_id}).toArray()
}

export async function addVotes(data){
    let client = await initDatabase()
    let db = await client.db()

    console.log({data});
    let keysList = Object.keys(data);
    keysList.shift()

    console.log({keysList});

    let updateList = []

    for(let i = 0; i < keysList.length; i++){
        let objKey = {}
        objKey[data[keysList[i]]] = 1
        updateList.push(objKey)
    }

    let results = []

    for(let i = 0; i < updateList.length; i++){
        let j = String(i+1)
        console.log("fitler", data.discussion_id, j);
        console.log("update",updateList[i] );

        let idd = "e36866f4-b477-4116-94cd-9216c0b5185c"

        results.push(await db.collection("votes").update(
            {discussion_id: idd, section:j},
            { $inc: updateList[i]}
        ))
    }

    return results
}