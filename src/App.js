import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

async function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    async function getBlockInfo() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockInfo(); 
  },[blockNumber]);

  const getBlockTransactions = async () => {
    const valuesArray = await alchemy.core.getBlock();
    let _transactions = valuesArray["transactions"];
    setTransactions(_transactions);
    return valuesArray;
  }
  getBlockTransactions();
  
  return (
    <div className="App">
      <div>
        Block Number: {blockNumber}
      </div>
      <div>
        Block: {getBlockTransactions}
      </div>
    </div>
  );
}

export default App;
