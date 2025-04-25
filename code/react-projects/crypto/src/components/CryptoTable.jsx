import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAsset } from '../redux/cryptoSlice';
import MockWebSocket from '../utils/mockWebSocket';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const assets = useSelector(state => state.crypto.assets);

  // Initialize mock WebSocket
  useEffect(() => {
    const ws = new MockWebSocket();
    ws.addEventListener('message', (event) => {
      const { id, updates } = JSON.parse(event.data);
      dispatch(updateAsset({ id, updates }));
    });
    return () => ws.close();
  }, [dispatch]);

  const formatNumber = (num, decimals = 2) => {
    if (num === null) return 'N/A';
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  const formatCurrency = (num) => '$' + formatNumber(num, 2);

  const getChangeClass = (change) => (change >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
            <th className="py-3 px-4 text-center">#</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Symbol</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">1h %</th>
            <th className="py-3 px-4 text-right">24h %</th>
            <th className="py-3 px-4 text-right">7d %</th>
            <th className="py-3 px-4 text-right">Market Cap</th>
            <th className="py-3 px-4 text-right">24h Volume</th>
            <th className="py-3 px-4 text-right">Circ. Supply</th>
            <th className="py-3 px-4 text-right">Max Supply</th>
            <th className="py-3 px-4 text-center">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-center">{asset.id}</td>
              <td className="py-3 px-4 flex items-center">
                <img src={asset.logo} alt={asset.name} className="w-6 h-6 mr-2" />
                <span>{asset.name}</span>
              </td>
              <td className="py-3 px-4">{asset.symbol}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(asset.price)}</td>
              <td className={`py-3 px-4 text-right ${getChangeClass(asset.change1h)}`}>
                {asset.change1h.toFixed(2)}%
              </td>
              <td className={`py-3 px-4 text-right ${getChangeClass(asset.change24h)}`}>
                {asset.change24h.toFixed(2)}%
              </td>
              <td className={`py-3 px-4 text-right ${getChangeClass(asset.change7d)}`}>
                {asset.change7d.toFixed(2)}%
              </td>
              <td className="py-3 px-4 text-right">{formatCurrency(asset.marketCap)}</td>
              <td className="py-3 px-4 text-right">{formatCurrency(asset.volume24h)}</td>
              <td className="py-3 px-4 text-right">{formatNumber(asset.circulatingSupply)}</td>
              <td className="py-3 px-4 text-right">{formatNumber(asset.maxSupply)}</td>
              <td className="py-3 px-4 text-center">
                <svg width="80" height="30" viewBox="0 0 80 30">
                  <polyline
                    points={`0,${15 + asset.change7d * 2} 20,${15 - asset.change7d} 40,${
                      15 + asset.change7d * 0.5
                    } 60,${15 - asset.change7d * 0.3} 80,15`}
                    fill="none"
                    stroke={asset.change7d >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth="2"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;