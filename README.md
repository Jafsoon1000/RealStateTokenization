# Jafsoon RWA Tokenization Dashboard

![Version](https://img.shields.io/badge/version-1.1.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Ethereum-gray)

**Jafsoon** is a premium, institutional-grade Real-World Asset (RWA) tokenization platform. It allows users to browse, analyze, and invest in fractionalized commercial real estate assets directly on the blockchain.

## 🚀 Features

- **Institutional Inventory**: Access high-yield commercial real estate assets previously reserved for institutional investors.
- **Fractional Ownership**: Invest in properties with as little as $1,000 using stablecoins or ETH.
- **Centralized State Management**: High-performance state management using Zustand for a seamless user experience.
- **Web3 Integration**: Seamless wallet connection via MetaMask and ethers.js.
- **Bloomberg-Style UI**: High-performance, dark-mode interface designed for professional traders and investors.
- **Asset Verification**: Transparent on-chain verification of underlying physical assets.
- **Secure API**: Robust input validation and restricted CORS for institutional-grade security.

## 🛠 Tech Stack

### Frontend
- **React 19**
- **Zustand** (State Management)
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Lucide React** (Icons)
- **Ethers.js v6** (Blockchain Interaction)

### Backend
- **Node.js** & **Express**
- **Zod** (Schema Validation)
- **MongoDB** (Database)
- **Mongoose** (ODM)

## 📂 Project Structure

```text
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── store/       # Zustand global state (useStore.js)
│   │   └── App.jsx      # Main application logic
│   ├── .env             # Client environment variables
│   └── tailwind.config.js
├── server/              # Node.js Express backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints with Zod validation
│   ├── .env             # Server environment variables
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
   Create a `.env` file in the `server` directory (see `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
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
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the client:
   ```bash
   npm run dev
   ```

## 🛣 API Endpoints

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| GET | `/api/properties` | Fetch all tokenized properties | None |
| POST | `/api/properties/buy` | Simulate buying a property fraction | Zod Schema |

### Buy Token Validation (Zod)
The `/api/properties/buy` endpoint requires the following JSON body:
```json
{
  "propertyId": "string",
  "tokensToBuy": "number (positive integer)",
  "walletAddress": "string (0x...)"
}
```

## 🛡 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Jafsoon](https://github.com/Jafsoon1000)
