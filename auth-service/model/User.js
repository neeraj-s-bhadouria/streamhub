import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the enum for interests
const InterestEnum = [
  "Science Fiction",
  "Thriller",
  "Comedy",
  "Drama",
  "Action",
  "Romance",
];

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String, // Corrected from 'email' to 'String'
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  interests: {
    type: [
      {
        type: String,
        enum: InterestEnum,
        required: true
      },
    ],
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: false
    },
  ],
  location: {
    type: String,
    required: true,
    default: "IN",
  },
  watchHistory: {
    type: [String],
    required: false,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
