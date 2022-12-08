import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Level = new Schema(
    {
        level: {
            type: String
        },
        sport: {
            type: Array
        },
        num_games:{
            type:Number
        }
    }
)

export default mongoose.model('Level', Level, 'levels');