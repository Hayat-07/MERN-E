const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be minimum 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    // image:{
    //     type:String,
    //     default:{
    //         defaultImagepath:defaultImagepath
    //     }
    // },
    address: {
      type: String,
      required: [true, "User Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    token:{
      type: String,
      default: "none",
    }
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = { User };
