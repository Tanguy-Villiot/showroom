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

export async function signInUser(email){

    let client = await initDatabase()
    let db = await client.db()

    return db.collection("user").find({email: email}).toArray()
}