const { Schema, model } = require('mongoose');const dateFormat = require('../models/Thoughts.js');

const UserSchema = new Schema({
    username: {
        type: string,
        unique: true,
        required: true,
        trim: true

    },
    email: {
        type: string,
        required: true,
        unique: true,
        match: true
        },
    
    thoughts: {
        type: []
    },
    friends: {
        type: []
    },
    toJSON: {
        virtuals: true,
        getters: true
    }
})

// thoughts: [
//     {
//       type: String,
//     }
//   ]


  //create the user model using the schema
const User = model('User', UserSchema)

  module.exports = User;