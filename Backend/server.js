const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
const url = 'mongodb://localhost:27017/hotelApp';
const cors = require('cors');
// MongoDB connect
app.use(cors());
mongoose.connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Schema using Mixed type
const hotelSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed
}); // strict false allows extra fields

// Model explicitly linked to existing collection
const Hotel = mongoose.model('Hotel', hotelSchema, 'Hotelwebsite');

// GET API to fetch all hotels
app.get('/find', async (req, res) => {
  
    const data = await Hotel.find();
    console.log(data); // check console for fetched docs
    res.status(200).json(data);
  
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
