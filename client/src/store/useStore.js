import { create } from 'zustand';
import axios from 'axios';
import { ethers } from 'ethers';

const useStore = create((set, get) => ({
  account: null,
  properties: [],
  loading: true,
  
  // Actions
  fetchProperties: async () => {
    set({ loading: true });
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.get(`${apiUrl}/properties`);
      set({ properties: data });
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback mock data
      set({
        properties: [
          {
            _id: '1',
            title: 'Skyline Office Tower',
            image_url: '/images/berlin_office_tower.png',
            location: 'Berlin, Germany',
            total_value: 125000000,
            token_price: 1000,
            available_tokens: 125000,
          },
          {
            _id: '2',
            title: 'Waterfront Luxury Suites',
            image_url: '/images/frankfurt_luxury_apartment.png',
            location: 'Frankfurt, Germany',
            total_value: 85000000,
            token_price: 500,
            available_tokens: 170000,
          },
          {
            _id: '3',
            title: 'Grand Munich Retail Plaza',
            image_url: '/images/munich_retail_space_modern.png',
            location: 'Munich, Germany',
            total_value: 45000000,
            token_price: 250,
            available_tokens: 180000,
          }
        ]
      });
    } finally {
      set({ loading: false });
    }
  },

  checkIfWalletIsConnected: async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        set({ account: accounts[0].address });
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  },

  connectWallet: async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      set({ account: accounts[0] });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  },
}));

export default useStore;
