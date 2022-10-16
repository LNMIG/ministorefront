import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env

const mongoURL = process.env.MONGODB_URL || `${DB_USER}://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export async function connectMongoose () {
    try {
        await mongoose.connect(mongoURL, options)
    }
    catch (err) {
        console.log('Error on mongoose')
    }
}


