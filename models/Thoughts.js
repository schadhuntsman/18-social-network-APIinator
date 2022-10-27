//reaction schema
const {Schema, model, Types } = require('mongoose');
const dateFormat = require('../models/Thoughts.js');


const ReactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
        trim: true
    },
    username: {
        type: String,
        required: true,
        createdAt: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat
        (createdAtVal)
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

const ThoughtsSchema = new Schema({
   
    thoughttext: {
        type: String,
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
        type: String,
        required: "You need to provide a username!",
        trim: true
    },
    reactions: [ReactionSchema]
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
ThoughtsSchema.virtual('ReactionCount', function() {
    return this.reactions.length;
  });

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts