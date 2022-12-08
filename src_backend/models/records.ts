import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Records = new Schema(
    {
        year: {
            type: Number
        },
        city: {
            type: String
        },
        sport: {
            type: String
        },
        discipline: {
            type: String
        },
        gender:{
            type: String
        },
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        country: {
            type: String
        },
        result: {
            type: String
        }
    }
)

export default mongoose.model('Records', Records, 'records');