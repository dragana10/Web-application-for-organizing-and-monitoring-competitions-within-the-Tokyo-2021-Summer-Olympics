import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Athlete = new Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        country: {
            type: String
        },
        sport: {
            type: String
        },
        disciplines:{
            type: Array
        },
        gender: {
            type: String
        },
        has_a_medal: {
            type: Number
        },
        medals: {
            type: Object
        }
    }
)

export default mongoose.model('Athlete', Athlete, 'athletes');