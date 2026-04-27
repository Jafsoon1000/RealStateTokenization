# Jafsoon RWA Tokenization Dashboard

![Version](https://img.shields.io/badge/version-2.0.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Ethereum-gray)
![Status](https://img.shields.io/badge/status-Live-brightgreen)

**Jafsoon** is a premium, institutional-grade Real-World Asset (RWA) tokenization platform. It allows users to browse, analyze, and invest in fractionalized commercial real estate assets directly on the blockchain.

---

## 🚀 Features

### Core Platform
- **Institutional Inventory**: Access high-yield commercial real estate assets previously reserved for institutional investors.
- **Fractional Ownership**: Invest in properties with as little as $250 using stablecoins or ETH.
- **Web3 Integration**: Seamless wallet connection via MetaMask and ethers.js.
- **Bloomberg-Style UI**: High-performance, dark-mode interface designed for professional traders and investors.

### Investment Tools
- **Estimated Yield Display**: Each property shows projected annual yield percentage to inform investment decisions.
- **Dynamic Token Sale Progress**: Real-time progress bars showing sold vs. available token supply.
- **Property Type Classification**: Assets categorized as Commercial, Residential, Industrial, Retail, or Mixed-Use.
- **Transaction History**: Live feed of all platform transactions with status tracking.

### Security & Compliance
- **Smart Contract Audited**: CertiK and OpenZeppelin audited token contracts.
- **Escrow Protection**: Multi-sig escrow until property closing is finalized on-chain.
- **Legal Compliance**: SPV entity structuring with SEC/MiFID II compliance.
- **KYC/AML Verification**: Institutional-grade identity verification.
- **Decentralized Custody**: Ethereum-recorded ownership with IPFS-backed document storage.
- **Real-Time Reporting**: Track rental income, occupancy, and valuations.

### Platform Analytics
- **Platform Stats Dashboard**: Live metrics including TVL, active investors, properties tokenized, and average returns.
- **Ticker Bar**: Bloomberg-style scrolling price ticker for all tokenized assets.

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
├── client/                  # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation with wallet connection
│   │   │   ├── PropertyCard.jsx     # Asset card with yield & progress
│   │   │   ├── HowItWorks.jsx       # 4-step investment process
│   │   │   ├── StatsBar.jsx         # Platform analytics metrics
│   │   │   ├── SecurityFeatures.jsx # Security & compliance grid
│   │   │   ├── TransactionHistory.jsx # Live transaction feed
│   │   │   └── Footer.jsx           # Links, newsletter, socials
│   │   ├── store/
│   │   │   └── useStore.js          # Zustand global state
│   │   ├── App.jsx                  # Main application layout
│   │   └── index.css                # Design system & theme
│   ├── .env                         # Client environment variables
│   └── tailwind.config.js
├── server/                  # Node.js Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection (serverless-safe)
│   ├── models/
│   │   ├── Property.js              # Property schema (with yield, type)
│   │   └── Transaction.js           # Transaction record schema
│   ├── routes/
│   │   ├── propertyRoutes.js        # CRUD + buy endpoints
│   │   └── transactionRoutes.js     # Transaction history & stats
│   ├── .env                         # Server environment variables
│   └── seed.js                      # Database seeding (6 properties)
├── vercel.json              # Vercel deployment config
└── README.md                # Project documentation
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

### Properties

| Method | Endpoint | Description | Validation |
|--------|----------|-------------|------------|
| GET | `/api/properties` | Fetch all tokenized properties | None |
| GET | `/api/properties/:id` | Fetch a single property by ID | MongoDB ObjectId |
| POST | `/api/properties/buy` | Simulate buying a property fraction | Zod Schema |

### Transactions

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/transactions` | Fetch recent transactions | `?wallet=0x...` |
| GET | `/api/transactions/stats` | Platform-wide analytics | None |

### Buy Token Validation (Zod)
The `/api/properties/buy` endpoint requires the following JSON body:
```json
{
  "propertyId": "string",
  "tokensToBuy": "number (positive integer)",
  "walletAddress": "string (0x...)"
}
```

### Stats Response Format
```json
{
  "totalTransactions": 142,
  "totalVolume": 1250000,
  "totalTokensBought": 8420,
  "uniqueInvestors": 67
}
```

## 🏗 Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────┐
│  React Frontend │────▶│  Express API    │────▶│  MongoDB     │
│  (Vite + TW4)   │     │  (Zod + CORS)   │     │  (Atlas)     │
└─────────────────┘     └─────────────────┘     └──────────────┘
        │                        │
        │                        │
   ┌────▼────┐            ┌──────▼──────┐
   │ MetaMask│            │  Vercel     │
   │ Wallet  │            │  Serverless │
   └─────────┘            └─────────────┘
```

## 🛡 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Jafsoon](https://github.com/Jafsoon1000)
