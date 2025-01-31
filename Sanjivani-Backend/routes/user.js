const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route: Create a New User (POST /new)
router.post('/new', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ username, email, phoneNumber, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Update a User by Email (PUT /updateByEmail)
router.put('/updateByEmail', async (req, res) => {
    const { email, username, phoneNumber, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!username && !phoneNumber && !password) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (password) user.password = password;

        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Get All Users (GET /)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Get a Specific User by Email (GET /:email)
router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Get a Specific Attribute of a User by Email (GET /:email/:attribute)
router.get('/:email/:attribute', async (req, res) => {
    const { email, attribute } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.toObject().hasOwnProperty(attribute)) {
            return res.status(400).json({ message: `Attribute ${attribute} not found for this user` });
        }

        res.json({ [attribute]: user[attribute] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route: Get User by Email (POST /getByEmail)
router.post('/getByEmail', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
