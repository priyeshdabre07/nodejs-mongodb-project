const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('Error: MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
}

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies


// 1. Connect to MongoDB (local database named 'testdb')
mongoose.connect(uri + '/testdb')
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));

// 2. Define a Data Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number
});

const User = mongoose.model('User', userSchema);

// ==========================================
// 3. CRUD ROUTES (REST API)
// ==========================================

// CREATE: Add a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ: Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE: Modify a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,          // Returns the modified document rather than the original
            runValidators: true // Ensures the updates adhere to the schema
        });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
