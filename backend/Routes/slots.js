const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

router.post('/book-slot', async (req, res) => {
  const { date, time, user } = req.body;
  try {
    const existingSlot = await Slot.findOne({ date: new Date(date), time });
    if (existingSlot && existingSlot.status === 'booked') {
      return res.status(400).json({ message: 'Slot already taken. Try another one!' });
    }

    if (existingSlot) {
      existingSlot.user = user;
      existingSlot.status = 'booked';
      await existingSlot.save();
    } else {
      const slot = new Slot({ date: new Date(date), time, user, status: 'booked' });
      await slot.save();
    }

    res.status(201).json({ message: 'Slot booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    let slots;
    if (date) {
      const selectedDate = new Date(date);
      slots = await Slot.find({
        date: {
          $gte: selectedDate,
          $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        }
      });
    } else {
      slots = await Slot.find();
    }
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

module.exports = router;
