// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoMemoryServer } = require('mongodb-memory-server');

// MongoDB Connection using In-Memory Database
const connectDB = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to In-Memory MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
connectDB();

// Define Product Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String
});
const Product = mongoose.model('Product', productSchema);

// RESTful API Endpoint: GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    
    // Simulating a slight delay to demonstrate the React loading spinner
    setTimeout(() => {
        res.json(products);
    }, 1000); 

  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Seed Route (Run this once to add dummy data to your database)
app.post('/api/seed', async (req, res) => {
    await Product.deleteMany({});
    const sampleProducts = [
        { name: "Wireless Headphones", price: 99, description: "High quality audio.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Mechanical Keyboard", price: 120, description: "Clicky switches.", imageUrl: "https://via.placeholder.com/150" },
        { name: "Gaming Mouse", price: 50, description: "RGB lighting.", imageUrl: "https://via.placeholder.com/150" }
    ];
    await Product.insertMany(sampleProducts);
    res.json({ message: "Database seeded successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});