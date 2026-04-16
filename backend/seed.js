const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const seedData = [
  {
    name: 'Industrial Steel Beam',
    category: 'Construction',
    vendor: 'MetalWorks Inc',
    price: 1250.00,
    purchasePrice: 850.00,
    quantity: 45,
    monthlyTrend: [40, 50, 45, 60, 75, 80, 85, 90, 80, 70, 65, 75]
  },
  {
    name: 'Heavy Duty Turbine',
    category: 'Machinery',
    vendor: 'TurboGen',
    price: 45000.00,
    purchasePrice: 32000.00,
    quantity: 8,
    monthlyTrend: [2, 3, 2, 4, 5, 4, 3, 5, 4, 6, 5, 7]
  },
  {
    name: 'Precision Lathe',
    category: 'Machinery',
    vendor: 'Precision Tools',
    price: 12000.00,
    purchasePrice: 9000.00,
    quantity: 12,
    monthlyTrend: [5, 6, 8, 7, 9, 10, 8, 7, 9, 11, 12, 10]
  },
  {
    name: 'Industrial Compressor',
    category: 'Tools',
    vendor: 'AirForce Ltd',
    price: 850.00,
    purchasePrice: 450.00,
    quantity: 154,
    monthlyTrend: [120, 130, 110, 140, 150, 160, 140, 130, 150, 170, 160, 180]
  },
  {
    name: 'Conveyor Belt System',
    category: 'Machinery',
    vendor: 'LogiMove',
    price: 8500.00,
    purchasePrice: 6200.00,
    quantity: 4,
    monthlyTrend: [1, 2, 1, 3, 2, 4, 3, 2, 4, 5, 4, 6]
  },
  {
    name: 'Safety Helmet Pack',
    category: 'Safety',
    vendor: 'SafeGuard',
    price: 45.00,
    purchasePrice: 15.00,
    quantity: 500,
    monthlyTrend: [300, 350, 400, 380, 420, 450, 480, 500, 460, 440, 420, 480]
  },
  {
    name: 'Welding Torch X10',
    category: 'Tools',
    vendor: 'FlameTech',
    price: 220.00,
    purchasePrice: 110.00,
    quantity: 85,
    monthlyTrend: [60, 65, 70, 75, 80, 85, 90, 95, 85, 80, 75, 85]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Atlas for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    await Product.insertMany(seedData);
    console.log('Successfully seeded 7 industrial products with historical data.');

    process.exit();
  } catch (err) {
    console.error('Seeding FAILED:', err.message);
    process.exit(1);
  }
};

seedDB();
