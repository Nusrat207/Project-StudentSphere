const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  Id: { type: Number, required: true },
  Subject: { type: String, required: true },
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true },
  CategoryColor: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
