import mongoose from "mongoose";

const { Schema } = mongoose;

// Create Schema
const ContentSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String, // Corrected from 'email' to 'String'
    required: true,
    unique: true,
  },
  Genre: {
    type: String, // Corrected capitalization from 'Genre' to 'genre'
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  uploadDate: {
    type: Date, // Changed to 'Date' type
    required: true,
    default: Date.now() // Changed to 'Date.now()' for dynamic default value
  },
  numOfUsersRated: {
    type: Number, // Changed to 'Number' type
    required: false,
  },
  starCast: {
    type: [String],
    required: false,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  uploadedBy: {
    type: String,
    required: false,
  },
});

const Content = mongoose.model("contents", ContentSchema);

export default Content;
