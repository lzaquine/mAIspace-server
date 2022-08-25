const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    profileImg: {
        type: String,
        default: 'https://res.cloudinary.com/dvzekm9zq/image/upload/v1660147231/cards/avatar_bpem8o.png'
    },
    field: { 
      type: String, 
      enum: ['Fun', 'Business', 'Programmer', 'Teacher']},
      createdResults: [{ type: Schema.Types.ObjectId, ref:'App' }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
