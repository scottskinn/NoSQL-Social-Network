const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVAl => dateFormat(createdAtVAl)
        },
        username: {
            type: String,
            required: true
        },
         // Array of nested documents created with the reactionSchema
            // these are like replies
        reactions: [
            
        ]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
        (total, reactions) => total + reactions.length + 1, 
        0
    );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;