const express = require('express'); // nodemon restart trigger
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Additional Feature Routes
app.use('/api/activities', require('./routes/activities'));
// app.use('/api/customers', require('./routes/customers'));
// app.use('/api/vehicles', require('./routes/vehicles'));
// app.use('/api/messages', require('./routes/messages'));

// MongoDB Connection
console.log('Attempting to connect to MongoDB at:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try another port.`);
      } else {
        console.error('Server error:', err);
      }
    });
  })
  .catch(err => {
    console.error('FAILED to connect to MongoDB:');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    process.exit(1);
  });
