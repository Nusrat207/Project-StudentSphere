const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  user: { type: String, required: false },
  status: { type: String, enum: ['booked', 'available'], default: 'available' }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
