const { Schema, model } = require('mongoose');

const ThoughtsSchema = new Schema({
   
    thoughtText: {
        type: string
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    username: {
        type: string
    },
    reactions: {
        type: [],
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
    },
    id: false
  }
);

  //get total count of thoughts on retrieval
  ThoughtsSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
  });

const Thought = model('Thought', ThoughtsSchema);

module.exports = 'Thoughts'