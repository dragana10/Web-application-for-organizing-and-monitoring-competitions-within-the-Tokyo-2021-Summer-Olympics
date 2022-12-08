import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Location = new Schema(
    {
        name: {
            type: String
        },
        time_scheduled: {
            type: Array
        },
        sports: {
            type: Array
        },
        disciplines:{
            type: Array
        }
    }
)

export default mongoose.model('Location', Location, 'locations');