const express = require('express');
const router = express.Router();
const Event = require('../models/Events');


router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).send(newEvent);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
