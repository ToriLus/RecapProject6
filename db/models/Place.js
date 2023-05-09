// db/models/Joke.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  place: {
    name: String,
    location: String,
    image: String,
    mapURL: String,
    description: String,
  },
});

const Places = mongoose.models.Places || mongoose.model("Places", placeSchema);

export default Places;
