import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const properties = [
  {
    title: 'Skyline Office Tower',
    image_url: '/images/berlin_office_tower.png',
    location: 'Berlin, Germany',
    total_value: 125000000,
    token_price: 1000,
    available_tokens: 125000,
  },
  {
    title: 'Waterfront Luxury Suites',
    image_url: '/images/frankfurt_luxury_apartment.png',
    location: 'Frankfurt, Germany',
    total_value: 85000000,
    token_price: 500,
    available_tokens: 170000,
  },
  {
    title: 'Grand Munich Retail Plaza',
    image_url: '/images/munich_retail_space_modern.png',
    location: 'Munich, Germany',
    total_value: 45000000,
    token_price: 250,
    available_tokens: 180000,
  },
  {
    title: 'Hamburg Logistics Terminal',
    image_url: '/images/hamburg_logistics_hub.png',
    location: 'Hamburg, Germany',
    total_value: 210000000,
    token_price: 2000,
    available_tokens: 105000,
  },
];

const importData = async () => {
  try {
    await Property.deleteMany();
    await Property.insertMany(properties);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
