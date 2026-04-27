const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property.js');
const connectDB = require('./config/db.js');

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
    yield_percentage: 8.5,
    property_type: 'commercial',
    description: 'A-grade 42-story office tower in the heart of Potsdamer Platz, featuring LEED Platinum certification and 98% occupancy rate across 340,000 sqft of premium workspace.',
  },
  {
    title: 'Waterfront Luxury Suites',
    image_url: '/images/frankfurt_luxury_apartment.png',
    location: 'Frankfurt, Germany',
    total_value: 85000000,
    token_price: 500,
    available_tokens: 170000,
    yield_percentage: 6.2,
    property_type: 'residential',
    description: 'Ultra-luxury residential complex on the Main River with 180 units, rooftop infinity pool, and private marina access. Located in the exclusive Westend district.',
  },
  {
    title: 'Grand Munich Retail Plaza',
    image_url: '/images/munich_retail_space_modern.png',
    location: 'Munich, Germany',
    total_value: 45000000,
    token_price: 250,
    available_tokens: 180000,
    yield_percentage: 11.3,
    property_type: 'retail',
    description: 'Prime retail destination near Marienplatz with 85,000 sqft of mixed retail and dining space. Anchored by three international luxury brands with 15-year leases.',
  },
  {
    title: 'Hamburg Logistics Terminal',
    image_url: '/images/hamburg_logistics_hub.png',
    location: 'Hamburg, Germany',
    total_value: 210000000,
    token_price: 2000,
    available_tokens: 105000,
    yield_percentage: 14.7,
    property_type: 'industrial',
    description: 'State-of-the-art logistics hub near Hamburg Port with automated sorting, cold storage facilities, and direct rail access. Leased to three Fortune 500 tenants.',
  },
  {
    title: 'Düsseldorf MedienHafen Complex',
    image_url: '/images/dusseldorf_medienhafen.png',
    location: 'Düsseldorf, Germany',
    total_value: 95000000,
    token_price: 750,
    available_tokens: 126667,
    yield_percentage: 9.8,
    property_type: 'mixed-use',
    description: 'Iconic mixed-use development in the MedienHafen district featuring 120,000 sqft of Class-A office space, ground-floor retail, and a boutique hotel wing.',
  },
  {
    title: 'Stuttgart Tech Campus',
    image_url: '/images/stuttgart_tech_campus.png',
    location: 'Stuttgart, Germany',
    total_value: 160000000,
    token_price: 1500,
    available_tokens: 106667,
    yield_percentage: 10.1,
    property_type: 'commercial',
    description: 'Next-generation tech campus with flexible co-working spaces, R&D labs, and EV charging infrastructure. Home to 12 high-growth tech companies in the automotive corridor.',
  },
  {
    title: 'Tokyo Data Node',
    image_url: '/images/tokyo_data_center.png',
    location: 'Tokyo, Japan',
    total_value: 350000000,
    token_price: 2500,
    available_tokens: 140000,
    yield_percentage: 12.5,
    property_type: 'industrial',
    description: 'Tier 4 data center in the Chiyoda district, providing critical infrastructure for global financial institutions and cloud providers with 99.999% uptime guarantee.',
  },
  {
    title: 'London Regents Retail',
    image_url: '/images/london_retail_plaza.png',
    location: 'London, UK',
    total_value: 120000000,
    token_price: 1200,
    available_tokens: 100000,
    yield_percentage: 7.8,
    property_type: 'retail',
    description: 'Premium retail destination on Regent Street featuring flagship stores of luxury global brands. High footfall area with consistent year-on-year growth in rental yields.',
  },
  {
    title: 'NYC Penthouse Collective',
    image_url: '/images/nyc_luxury_penthouse.png',
    location: 'New York City, USA',
    total_value: 280000000,
    token_price: 5000,
    available_tokens: 56000,
    yield_percentage: 5.5,
    property_type: 'residential',
    description: 'Collection of ultra-luxury penthouses on Billionaires Row with unobstructed views of Central Park. Features world-class amenities and 24/7 concierge service.',
  },
  {
    title: 'Dubai Sky Hub',
    image_url: '/images/dubai_mixed_use_tower.png',
    location: 'Dubai, UAE',
    total_value: 195000000,
    token_price: 1500,
    available_tokens: 130000,
    yield_percentage: 9.2,
    property_type: 'mixed-use',
    description: 'Iconic skyscraper in Downtown Dubai combining Class-A office spaces, luxury hotel suites, and high-end residential units with panoramic views of the Burj Khalifa.',
  },
  {
    title: 'Singapore Tech Valley',
    image_url: '/images/singapore_tech_campus.png',
    location: 'Singapore',
    total_value: 210000000,
    token_price: 2000,
    available_tokens: 105000,
    yield_percentage: 8.9,
    property_type: 'commercial',
    description: 'State-of-the-art biophilic office campus in the One-North tech district. Features sustainable design, vertical gardens, and intelligent building management systems.',
  },
];

const importData = async () => {
  try {
    await Property.deleteMany();
    await Property.insertMany(properties);
    console.log('Data Imported Successfully!');
    console.log(`Seeded ${properties.length} properties.`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
