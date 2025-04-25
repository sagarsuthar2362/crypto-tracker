import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;