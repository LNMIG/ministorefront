import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectMongoose } from '../mongomodel/connection.js'
import productModel from '../mongomodel/product.js'
import categoryModel from '../mongomodel/category.js'
import currencyModel from '../mongomodel/currency.js'
import { productData } from './productData.js'
import { currencyData } from './currencyData.js'
import { categoryData } from './categoryData.js'

dotenv.config()
const {
    DB_USER,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_COLLECTION1,
    DB_COLLECTION2,
    DB_COLLECTION3,
} = process.env
const mongoURL = `${DB_USER}://${DB_HOST}:${DB_PORT}/${DB_NAME}`


mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.createConnection(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})

//Create Collections
// db.createCollection(DB_COLLECTION1, (err, result) => {})
// db.createCollection(DB_COLLECTION2, (err, result) => {})
// db.createCollection(DB_COLLECTION3, (err, result) => {})
//Clean Collections
db.collection(DB_COLLECTION1).drop()
db.collection(DB_COLLECTION2).drop()
db.collection(DB_COLLECTION3).drop()

const seeder = async () => {
    connectMongoose()
    for (let i=0; i< productData.length; i++) {
        await productModel.create(productData[i])
    }
    for (let i=0; i< categoryData.length; i++) {
        await categoryModel.create(categoryData[i])
    }
    for (let i=0; i< currencyData.length; i++) {
        await currencyModel.create(currencyData[i])
    }
}

export default seeder