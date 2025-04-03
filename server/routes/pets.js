import express from 'express';
import Pet from '../models/Pet.js';

const router = express.Router();

// @route   GET api/pets
// @desc    Get all pets available for adoption
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({ isAdopted: false }).sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/pets/:id
// @desc    Get pet by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/pets
// @desc    Create a pet listing
// @access  Public (ideally should be protected, but keeping it simple)
router.post('/', async (req, res) => {
  const {
    name,
    age,
    breed,
    location,
    description,
    image,
    ownerName,
    ownerEmail,
    ownerPhone
  } = req.body;

  try {
    const newPet = new Pet({
      name,
      age,
      breed,
      location,
      description,
      image,
      ownerName,
      ownerEmail,
      ownerPhone
    });

    const pet = await newPet.save();
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/pets/:id
// @desc    Update pet details
// @access  Public (ideally should be protected)
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    // Update fields
    const updatedFields = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedPet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;