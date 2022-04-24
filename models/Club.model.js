const { Schema, model } = require("mongoose");

const clubSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        matches: [{
            type: Schema.Types.ObjectId,
            ref: 'Match'
        }],
        imgUrl: {
            type: String
        }
    },

    {

        timestamps: true,
    }
);

const Club = model("Club", clubSchema);

module.exports = Club;
