//reaction schema
const {Schema, model } = require('mongoose');
const Date = require('../models/Thoughts');

const ReactionSchema = new Schema({

    reactionId: mongoose.ObjectId,
    
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


    


})