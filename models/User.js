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

// thoughts: [
//     {
//       type: String,
//     }
//   ]


  //create the user model using the schema
const User = model('User', UserSchema)

  module.exports = User;