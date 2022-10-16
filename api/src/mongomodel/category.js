import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
},
{timestamps: false, versionKey: false }
)
schema.plugin(uniqueValidator)
export default mongoose.model('scandicategories', schema)