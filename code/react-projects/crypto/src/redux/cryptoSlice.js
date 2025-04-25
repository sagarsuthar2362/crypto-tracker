import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [
    {
      id: 1,
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      name: "Bitcoin",
      symbol: "BTC",
      price: 65000,
      change1h: 0.5,
      change24h: 2.3,
      change7d: -1.2,
      marketCap: 1280000000000,
      volume24h: 35000000000,
      circulatingSupply: 19700000,
      maxSupply: 21000000,
    },
    {
      id: 2,
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      name: "Ethereum",
      symbol: "ETH",
      price: 3200,
      change1h: -0.3,
      change24h: 1.8,
      change7d: 3.5,
      marketCap: 384000000000,
      volume24h: 18000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
    },
    {
      id: 3,
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      name: "Tether",
      symbol: "USDT",
      price: 1.0,
      change1h: 0.0,
      change24h: 0.0,
      change7d: 0.0,
      marketCap: 110000000000,
      volume24h: 50000000000,
      circulatingSupply: 110000000000,
      maxSupply: null,
    },
    {
      id: 4,
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      name: "BNB",
      symbol: "BNB",
      price: 600,
      change1h: 0.8,
      change24h: -0.9,
      change7d: 2.1,
      marketCap: 90000000000,
      volume24h: 2000000000,
      circulatingSupply: 150000000,
      maxSupply: 200000000,
    },
    {
      id: 5,
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
      name: "Solana",
      symbol: "SOL",
      price: 150,
      change1h: -1.0,
      change24h: 4.2,
      change7d: -2.5,
      marketCap: 68000000000,
      volume24h: 3000000000,
      circulatingSupply: 450000000,
      maxSupply: null,
    },
  ],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateAsset(state, action) {
      const { id, updates } = action.payload;
      const asset = state.assets.find((a) => a.id === id);
      if (asset) {
        Object.assign(asset, updates);
      }
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;
