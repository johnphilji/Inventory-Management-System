const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Atlas...');

    const email = 'jj@gmail.com';
    let user = await User.findOne({ email });

    if (!user) {
      console.log('User not found. Creating jj@gmail.com...');
      user = new User({
        name: 'jojo boi', // Default name from the screenshot
        email: email,
        password: '12345678'
      });
      await user.save();
      console.log('User created successfully.');
    } else {
      console.log('User found:', user._id);
    }

    // Assign all existing products to this user
    const result = await Product.updateMany(
      {}, // Match all products
      { $set: { userId: user._id } }
    );
    
    console.log(`Updated ${result.modifiedCount} products to belong to jj@gmail.com`);

    process.exit();
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
};

migrateData();
