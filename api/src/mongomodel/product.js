import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
{
    setId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    gallery: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    attributes: {
        type: Array,
        required: false,
    },
    prices: {
        type: Array,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
},
{timestamps: false, versionKey: false }
)
schema.plugin(uniqueValidator)
export default mongoose.model('scandiproducts', schema)