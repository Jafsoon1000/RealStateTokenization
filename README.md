# Jafsoon RWA Tokenization Dashboard

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Ethereum-gray)

**Jafsoon** is a premium, institutional-grade Real-World Asset (RWA) tokenization platform. It allows users to browse, analyze, and invest in fractionalized commercial real estate assets directly on the blockchain.

## 🚀 Features

- **Institutional Inventory**: Access high-yield commercial real estate assets previously reserved for institutional investors.
- **Fractional Ownership**: Invest in properties with as little as $1,000 using stablecoins or ETH.
- **Live Market Data**: Real-time ticker for asset prices and market indices.
- **Web3 Integration**: Seamless wallet connection via MetaMask and ethers.js.
- **Bloomberg-Style UI**: High-performance, dark-mode interface designed for professional traders and investors.
- **Asset Verification**: Transparent on-chain verification of underlying physical assets.

## 🛠 Tech Stack

### Frontend
- **React 19**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Lucide React** (Icons)
- **Ethers.js v6** (Blockchain Interaction)

### Backend
- **Node.js** & **Express**
- **MongoDB** (Database)
- **Mongoose** (ODM)

## 📂 Project Structure

```text
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   └── App.jsx      # Main application logic
│   └── tailwind.config.js
├── server/              # Node.js Express backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── seed.js          # Database seeding script
└── README.md            # Project documentation
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- MetaMask browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jafsoon1000/RealStateTokenization.git
   cd RealStateTokenization
   ```

2. **Setup the Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
   Seed the database:
   ```bash
   npm run seed
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Setup the Client**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 🛣 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Fetch all tokenized properties |
| GET | `/api/properties/:id` | Fetch details for a specific property |

## 🛡 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Jafsoon](https://github.com/Jafsoon1000)
