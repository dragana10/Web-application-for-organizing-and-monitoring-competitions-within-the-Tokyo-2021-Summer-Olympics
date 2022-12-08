import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        email:{
            type: String
        },
        nationality: {
            type: String
        },
        type: {
            type: Number
        },
        accepted: {
            type: Boolean
        },
        num_compet: {
            type: Number
        }
    }
)

export default mongoose.model('User', User, 'users');