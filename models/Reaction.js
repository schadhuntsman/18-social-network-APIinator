//reaction schema
const {Schema, model, Types } = require('mongoose');
const dateFormat = require('../models/Thoughts.js');


const ReactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    
    reactionBody: {
        type: string,
        required: true,
        maxLength: 280
    },
    username: {
        type: string,
        required: true,
        createdAt: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
},
    {
        toJSON: {
            getters: true
        }
    }

)
ReactionSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});

ReactionSchema();