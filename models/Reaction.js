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
ReactionSchema.virtual('reactionCount', function() {
    return this.reaction.length;
});

ReactionSchema();