const { Schema, model } = require("mongoose");

const matchSchema = new Schema(
    {
        result: {
            type: String,
            required: true
        },
        initDate: {
            type: Date
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
        }
    },

    {

        timestamps: true,
    }
);

const Match = model("Match", matchSchema);

module.exports = Match;