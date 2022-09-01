const {Schema, model, Types } = require('mongoose');
const dateFormat = require('../models/Thoughts.js');


const ThoughtsSchema = new Schema({
   
    thoughtText: {
        type: string,
        required: true,
        minLength: 1,
        maxLenth: 280
    },
    createdAt: {
        type: Date,
        default:Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: string,
        required: true
    },
    reactions: {
        type: [ReactionSchema],
    },

thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
    }
  ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  }
);

//   //get total count of thoughts on retrieval
//   ThoughtsSchema.virtual('thoughtCount').get(function() {
//     return this.thoughts.length;
//   });

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, thoughts) => total + thoughts.reactions.length + 1, 0);
});

//set date default value to current timestamp on query schema settings
ThoughtsSchema.virtual('date').get(function() {  
    return (createdAtVal) => dateFormat(createdAtVal) 
});


const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = 'Thoughts'