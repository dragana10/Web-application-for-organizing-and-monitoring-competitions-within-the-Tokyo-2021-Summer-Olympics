import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Country = new Schema(
    {
        country: {
            type: String
        },
        cnt: {
            type: Number
        }
    }
)

export default mongoose.model('Country', Country, 'countries');