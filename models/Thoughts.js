const {Schema, model, Types } = require('mongoose');
const dateFormat = require('../models/Thoughts.js');

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
        (createdAtVal),
    },
},
    {
        toJSON: {
            getters: true
        }
    }

)


ReactionSchema();

const ThoughtsSchema = new Schema({
   
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLenth: 280,
    },
    createdAt: {
        type: Date,
        default:Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: "You need to provide a username!",
        trim: true,
    },
    reactions: {
        type: [ReactionSchema],
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
ReactionSchema.virtual('reactionCount', function() {
    return this.reaction.length;
});


const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = 'Thoughts'