const mongoose = require('mongoose');

// Define the crop schema
const cropSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // reference the user who added the crop
  dateAdded: { type: Date, default: Date.now }
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
