import { create } from 'zustand';
import axios from 'axios';
import { ethers } from 'ethers';

const useStore = create((set, get) => ({
  account: null,
  properties: [],
  loading: true,
  theme: 'dark',
  
  // Actions
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  fetchProperties: async () => {
    set({ loading: true });
    try {
      // In production (Vercel), VITE_API_URL is not set so we use a relative path
      // which works with Vercel's rewrites. Locally, we fall back to localhost.
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const { data } = await axios.get(`${apiUrl}/properties`, { timeout: 10000 });
      set({ properties: data });
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback mock data with all 11 properties
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
            yield_percentage: 8.5,
            property_type: 'commercial',
          },
          {
            _id: '2',
            title: 'Waterfront Luxury Suites',
            image_url: '/images/frankfurt_luxury_apartment.png',
            location: 'Frankfurt, Germany',
            total_value: 85000000,
            token_price: 500,
            available_tokens: 170000,
            yield_percentage: 6.2,
            property_type: 'residential',
          },
          {
            _id: '3',
            title: 'Grand Munich Retail Plaza',
            image_url: '/images/munich_retail_space_modern.png',
            location: 'Munich, Germany',
            total_value: 45000000,
            token_price: 250,
            available_tokens: 180000,
            yield_percentage: 11.3,
            property_type: 'retail',
          },
          {
            _id: '4',
            title: 'Hamburg Logistics Terminal',
            image_url: '/images/hamburg_logistics_hub.png',
            location: 'Hamburg, Germany',
            total_value: 210000000,
            token_price: 2000,
            available_tokens: 105000,
            yield_percentage: 14.7,
            property_type: 'industrial',
          },
          {
            _id: '5',
            title: 'Düsseldorf MedienHafen Complex',
            image_url: '/images/dusseldorf_medienhafen.png',
            location: 'Düsseldorf, Germany',
            total_value: 95000000,
            token_price: 750,
            available_tokens: 126667,
            yield_percentage: 9.8,
            property_type: 'mixed-use',
          },
          {
            _id: '6',
            title: 'Stuttgart Tech Campus',
            image_url: '/images/stuttgart_tech_campus.png',
            location: 'Stuttgart, Germany',
            total_value: 160000000,
            token_price: 1500,
            available_tokens: 106667,
            yield_percentage: 10.1,
            property_type: 'commercial',
          },
          {
            _id: '7',
            title: 'Tokyo Data Node',
            image_url: '/images/tokyo_data_center.png',
            location: 'Tokyo, Japan',
            total_value: 350000000,
            token_price: 2500,
            available_tokens: 140000,
            yield_percentage: 12.5,
            property_type: 'industrial',
          },
          {
            _id: '8',
            title: 'London Regents Retail',
            image_url: '/images/london_retail_plaza.png',
            location: 'London, UK',
            total_value: 120000000,
            token_price: 1200,
            available_tokens: 100000,
            yield_percentage: 7.8,
            property_type: 'retail',
          },
          {
            _id: '9',
            title: 'NYC Penthouse Collective',
            image_url: '/images/nyc_luxury_penthouse.png',
            location: 'New York City, USA',
            total_value: 280000000,
            token_price: 5000,
            available_tokens: 56000,
            yield_percentage: 5.5,
            property_type: 'residential',
          },
          {
            _id: '10',
            title: 'Dubai Sky Hub',
            image_url: '/images/dubai_mixed_use_tower.png',
            location: 'Dubai, UAE',
            total_value: 195000000,
            token_price: 1500,
            available_tokens: 130000,
            yield_percentage: 9.2,
            property_type: 'mixed-use',
          },
          {
            _id: '11',
            title: 'Singapore Tech Valley',
            image_url: '/images/singapore_tech_campus.png',
            location: 'Singapore',
            total_value: 210000000,
            token_price: 2000,
            available_tokens: 105000,
            yield_percentage: 8.9,
            property_type: 'commercial',
          },
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
