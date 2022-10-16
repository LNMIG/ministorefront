import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
{
    symbol: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    }
},
{timestamps: false, versionKey: false }
)
schema.plugin(uniqueValidator)
export default mongoose.model('scandicurrencies', schema)