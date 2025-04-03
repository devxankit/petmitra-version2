import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// Add a new pet (POST)
router.post("/api/reports", async (req, res) => {
  try {
    const { petName, breed, age, color } = req.body;
    const newPet = new Pet({ petName, breed, age, color });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: "Error adding pet", error });
  }
});

// Get all pets (GET)
router.get("/api/reports", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
});

export default router;
