const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://madhavarora132005:mHgBvo8TJ2ArRbQC@cluster0.wp11z.mongodb.net/AuthUser?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Define Schema and Model
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', itemSchema);
const PORT = 5000;

// API Endpoints

// Create Item
app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
});

// Get All Items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

// Update Item
app.put('/api/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedItem);
});

// Delete Item
app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: 'Item deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
