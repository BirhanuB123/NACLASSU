import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  url: String,    
  title: String, 
});

export default mongoose.model('Photo', PhotoSchema);