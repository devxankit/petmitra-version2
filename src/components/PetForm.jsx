import { useState, useEffect } from "react";
import axios from "axios";

const PetForm = () => {
  const [pet, setPet] = useState({ petName: "", breed: "", age: "", color: "" });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const res = await axios.get("http://localhost:5000/api/pets");
    setPets(res.data);
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/pets", pet);
    fetchPets(); // Update UI instantly
    setPet({ petName: "", breed: "", age: "", color: "" });
  };

  return (
    <div>
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="petName" value={pet.petName} onChange={handleChange} placeholder="Pet Name" required />
        <input type="text" name="breed" value={pet.breed} onChange={handleChange} placeholder="Breed" required />
        <input type="number" name="age" value={pet.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="color" value={pet.color} onChange={handleChange} placeholder="Color" required />
        <button type="submit">Add Pet</button>
      </form>

      <h2>Pet List</h2>
      <div>
        {pets.map((p) => (
          <div key={p._id} style={{ border: "1px solid", padding: "10px", margin: "10px" }}>
            <p><strong>Name:</strong> {p.petName}</p>
            <p><strong>Breed:</strong> {p.breed}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Color:</strong> {p.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetForm;
