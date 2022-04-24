const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    matches: [{
      type: Schema.Types.ObjectId,
      ref: 'Match'
    }],
    favouriteClub: [{
      type: Schema.Types.ObjectId,
      ref: 'Club'
    }],
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'MOD'],
      default: 'USER'
    },
    imgUrl: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png"
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],

  },

  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
