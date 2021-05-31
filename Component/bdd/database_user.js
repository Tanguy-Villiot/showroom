import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';


const { MONGODB_URI_USER, MONGODB_DB_USER } = process.env

if (!MONGODB_URI_USER) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

if (!MONGODB_DB_USER) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoUser

if (!cached) {
    cached = global.mongoUser = { conn: null, promise: null }
}

async function connectToDatabase(req, res, next) {
    if (cached.conn) {

        console.log("déjà connecté")

        // return cached.conn

        req.dbClient = cached.conn.client;
        req.db = cached.conn.db;
        return next();
    }

    if (!cached.promise) {


        console.log("pas connecté")



        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = MongoClient.connect(MONGODB_URI_USER, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB_USER),
            }
        })
    }
    cached.conn = await cached.promise


    req.dbClient = cached.conn.client;
    req.db = cached.conn.db;
    return next();
    // return cached.conn
}

// const client = new MongoClient('mongodb+srv://Admin:Biloute29Bdd@cluster0.tqllm.mongodb.net/Showroom?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// async function database(req, res, next) {
//     if (!client.isConnected())
//     {
//         console.log("new connection !!")
//         await client.connect();
//     }
//     req.dbClient = client;
//     req.db = client.db('Showroom');
//     return next();
// }

const middleware = nextConnect();

middleware.use(connectToDatabase);

export default middleware;