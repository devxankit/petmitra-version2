import express from 'express';
import Adoption from '../models/Adoption.js';
import Pet from '../models/Pet.js';

const router = express.Router();

// @route   POST api/adoptions
// @desc    Submit adoption request
// @access  Public
router.post('/', async (req, res) => {
  const {
    petId,
    name,
    email,
    phone,
    address,
    reason
  } = req.body;

  try {
    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    // Check if pet is already adopted
    if (pet.isAdopted) {
      return res.status(400).json({ msg: 'This pet has already been adopted' });
    }

    const newAdoption = new Adoption({
      petId,
      name,
      email,
      phone,
      address,
      reason
    });

    const adoption = await newAdoption.save();
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/adoptions/:id
// @desc    Get adoption request by ID
// @access  Private (would need auth middleware)
router.get('/:id', async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('petId');
    if (!adoption) {
      return res.status(404).json({ msg: 'Adoption request not found' });
    }
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Adoption request not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/adoptions/:id
// @desc    Update adoption status
// @access  Private (would need auth middleware)
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    let adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ msg: 'Adoption request not found' });
    }

    adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    // If adoption is approved, mark pet as adopted
    if (status === 'approved') {
      await Pet.findByIdAndUpdate(adoption.petId, { $set: { isAdopted: true } });
    }

    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Adoption request not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;