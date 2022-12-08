import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Holder = new Schema(
    {
        name: {
            type: String
        },
        sport: {
            type: String
        },
        gender: {
            type: String
        },
        num_of_hldrs: {
            type: Number
        },
        candidates: {
            type: Array
        },
        first: {
            type: Array
        },
        second: {
            type: Array
        },
        third: {
            type: Array
        },
        fourth: {
            type: Array
        },
        fifth: {
            type: Array
        },
        sixth: {
            type: Array
        },
        seventh: {
            type: Array
        },
        eighth: {
            type: Array
        },
        ninth: {
            type: Array
        },
        tenth: {
            type: Array
        },
        eleventh: {
            type: Array
        },
        twelfth: {
            type: Array
        },
        thirteenth: {
            type: Array
        },
        fourteenth: {
            type: Array
        },
        fifteenth: {
            type: Array
        },
        sixteenth: {
            type: Array
        }
    }
)

export default mongoose.model('Holder', Holder, 'holders');