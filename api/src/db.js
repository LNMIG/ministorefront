import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const { DB_USER, DB_HOST, PORT, DB_NAME } = process.env

let connection
const mongoURL = process.env.MONGODB_URL || `${DB_USER}://${DB_HOST}:${PORT}/${DB_NAME}` 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function connectDB () {
    if(connection) return connection //don't need to define it again if it exists

    connection = new Promise(async(resolve, reject) => {
        try {
            let dbConnection
            let client
            //a new MongoClient is created
            client = new MongoClient(mongoURL, options)
            //connect client to server
            await client.connect()
            //connect to date base
            dbConnection = client.db(DB_NAME)
            //resolve with dbConnection
            resolve(dbConnection)
        } catch (error) {
            console.error('Error happened:', error)
            process.exit(1)
        }
    })
    return connection
}

export default connectDB