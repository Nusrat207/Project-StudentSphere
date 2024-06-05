const Slot = require('../models/Slot');

const generateTimeSlots = () => {
  const slots = [];
  const today = new Date().setHours(0, 0, 0, 0);
  const machines = 3; 
  for (let j = 1; j <= machines; j++) {
    for (let i = 0; i < 24; i += 2) {
      const startTime = `${i < 10 ? '0' + i : i}:00`;
      const endTime = `${i + 2 < 10 ? '0' + (i + 2) : i + 2}:00`;
      slots.push({ date: new Date(today), time: `${startTime} - ${endTime}`, status: 'available', machine: j });
    }
  }
  return slots;
};


const insertTimeSlots = async () => {
  try {
    const predefinedSlots = generateTimeSlots();
    console.log('Generated Slots:', predefinedSlots); 
    const result = await Slot.insertMany(predefinedSlots);
    console.log('Predefined slots inserted successfully:', result);
  } catch (err) {
    console.error('Error inserting predefined slots:', err);
  }
};

insertTimeSlots();
