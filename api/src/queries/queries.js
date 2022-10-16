import connectDB from '../../src/db.js'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { errorHandler } from '../errorhandler/errorhandler.js'

dotenv.config()
const {DB_COLLECTION1, DB_COLLECTION2, DB_COLLECTION3} = process.env

export const queries =
{
    getCategories: async () => {
        let db, categories = []
        try {
            db = await connectDB()
            categories = await db.collection(DB_COLLECTION2).find({}).toArray()
            return categories
        } catch (error) {
            errorHandler(error)
        }
        
    },
    getCategory: async (root, { name }) => {
        let db, filtered, products
        try {
            db = await connectDB()
            products = await db.collection(DB_COLLECTION1).find({}).toArray()
            if (name === 'all') return products
            return filtered = await products.filter(each => each.category === name)
        } catch (error) {
            errorHandler(error)
        }
    },
    getCurrencies: async () => {
        let db, currencies = []
        try {
            db = await connectDB()
            currencies = await db.collection(DB_COLLECTION3).find({}).toArray()
            return currencies
        } catch (error) {
            errorHandler(error)
        }
        
    },
    getProducts: async () => {
        let db, products
        try {
            db = await connectDB()
            products = await db.collection(DB_COLLECTION1).find({}).toArray()
            return products
        } catch (error) {
            errorHandler(error)
        }
    },
    getProduct: async (root, { setId }) => {
        let db, product
        try {
            db = await connectDB()
            product = await db.collection(DB_COLLECTION1).findOne({setId: setId})
            return product
        } catch (error) {
            errorHandler(error)
        }
    },
}