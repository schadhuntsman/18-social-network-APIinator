const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: string
    },
    email: {
        type: string,
        validate: {
            //match email
        }
    },
    thouhghts: {
        type: []
    },
    friends: {
        type: []
    },
})