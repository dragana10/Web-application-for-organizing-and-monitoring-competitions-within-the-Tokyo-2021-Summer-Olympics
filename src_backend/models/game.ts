import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Game = new Schema(
    {
        level : {
            Array
        },
        level_num:{
            Number
        },
        serial_num:{
            Number
        },
        next:{
            Number
        },
        levels_max:{
            Number
        },
        sport : {
            String
        },
        discipline : {
            String
        },
        gender : {
            String
        },
        group:{
            String
        },
        date_start : {
            Date
        },
        date_end : {
            Date
        },
        time_start : {
            Date
        },
        status:{
            Number
        },
        num_par:{
            Number
        },
        team_A:{
            Object
        },
        team_B:{
            Object
        },
        participants:{
            Array
        },
        bronze:{
            Object
        },
        silver:{
            Object
        },
        gold:{
            Object
        },
        result:{
            Array
        },
        winner:{
            Object
        }
    }
)

export default mongoose.model('Game', Game, 'games');