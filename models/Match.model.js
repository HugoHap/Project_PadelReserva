const { Schema, model } = require("mongoose");

const matchSchema = new Schema(
    {
        result: {
            type: Number,
            default: 0
        },
        date: {
            type: Date
        },
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        club: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        price: {
            type: Number
        },
        genre: {
            type: String,
            enum: ['Mixto', 'Femenino', 'Masculino']
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },

    {

        timestamps: true,
    }
);

const Match = model("Match", matchSchema);

module.exports = Match;