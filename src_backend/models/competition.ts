import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competition = new Schema(
    {
        name : {
            type: String
        },
        sport : {
            type: String
        },
        discipline : {
            type: String
        },
        gender : {
            type: String
        },
        kind : {
            type: Number
        },
        level : {
            type: Array
        },
        date_start : {
            type: Date
        },
        date_end : {
            type: Date
        },
        time_start : {
            type: String 
        },
        time_end:{
            type: Date
        },
        location:{
            type: String
        },
        delegate:{
            type: String
        },
        status:{
            type: Number
        },
        num_par:{
            type: Number
        },
        to_apply:{
            type: Array
        },
        participants:{
            type: Array
        },
        bronze:{
            type: Object
        },
        silver:{
            type: Object
        },
        gold:{
            type: Object
        },
        winner:{
            type: Object
        }
    }
)

export default mongoose.model('Competition', Competition, 'competition');