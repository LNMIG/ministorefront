import connectDB from '../../src/db.js'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { errorHandler } from '../errorhandler/errorhandler.js'

dotenv.config()
const {DB_COLLECTION} = process.env

export const mutations =
{   
    postProducts: async (root, { input }) => {
        const newInput = {
            setId: input.setId,
            name: input.name,
            inStock: input.inStock,
            gallery: input.gallery,
            description: input.description,
            category: input.category,
            attributes: input.attributes,
            prices: input.prices,
            brand: input.brand,
        }
        
        let db, newProduct, newProductId
        try {
            db = await connectDB()
            newProductId = await db.collection(DB_COLLECTION).insertOne(newInput)
            newProduct = await db.collection(DB_COLLECTION).findOne( {_id: ObjectId(newProductId.insertedId)} )
            return newProduct
        } catch (error) {
            errorHandler(error)
        }
    },
}