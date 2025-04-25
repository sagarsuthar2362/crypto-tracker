const initialPrices = {
    1: 65000,
    2: 3200,
    3: 1.0,
    4: 600,
    5: 150,
  };
  
  const initialVolumes = {
    1: 35000000000,
    2: 18000000000,
    3: 50000000000,
    4: 2000000000,
    5: 3000000000,
  };
  
  class MockWebSocket {
    constructor() {
      this.listeners = [];
      this.start();
    }
  
    addEventListener(type, callback) {
      if (type === 'message') {
        this.listeners.push(callback);
      }
    }
  
    start() {
      this.interval = setInterval(() => {
        const id = Math.floor(Math.random() * 5) + 1;
        const priceChange = (Math.random() * 2 - 1) * 100; // -100 to +100
        const percentChange = (Math.random() * 2 - 1); // -1% to +1%
        const volumeChange = Math.random() * 1000000000; // Up to 1B
  
        const update = {
          id,
          updates: {
            price: Math.max(0, initialPrices[id] + priceChange),
            change1h: percentChange,
            change24h: percentChange * 2,
            change7d: percentChange * 3,
            volume24h: Math.max(0, initialVolumes[id] + volumeChange),
          },
        };
  
        this.listeners.forEach((callback) =>
          callback({ data: JSON.stringify(update) })
        );
      }, Math.random() * 1000 + 1000); // 1-2s
    }
  
    close() {
      clearInterval(this.interval);
    }
  }
  
  export default MockWebSocket;