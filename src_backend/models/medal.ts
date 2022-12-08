import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Medal = new Schema(
    {
        country: {
            type: String
        },
        gold: {
            type: Number
        },
        silver: {
            type: Number
        },
        bronze: {
            type: Number
        },
        total: {
            type: Number
        }
    }
)

export default mongoose.model('Medal', Medal, 'medals');