import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env

const mongoURL = `${DB_USER}://${DB_HOST}:${DB_PORT}/${DB_NAME}`

export async function connectMongoose () {
    try {
        await mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    }
    catch (err) {
        console.log('Error on mongoose')
    }
}


