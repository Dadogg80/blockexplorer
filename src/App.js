import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header';
import Nav from './components/Content';

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

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState();
  const [nonce, setNonce] = useState();
  const [hash, setHash] = useState();
  const [number, setNumber] = useState();
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    async function getBlockInfo() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockInfo(); 
  },[]);

  const getBlock = async () => {
    const valuesArray = await alchemy.core.getBlock();
    setTransactions(valuesArray["transactions"]);
    setHash(valuesArray["hash"]);
    setNonce(valuesArray["nonce"]);
    setNumber(valuesArray["number"]);

  }
  const getBlockTransactions = async (hash) => {
    const receipt = await alchemy.core.getTransactionReceipt(hash);
    setReceipt(receipt);
    console.log(receipt)
  }
  
  return (

    <div className="App">
      <div className='container'>
        <Header blockNumber={blockNumber}/>
          <button type='btn' onClick={() => getBlock()}>Get Block Data</button>
          <Nav hash={hash} nonce={nonce} number={number}/>
        {
          hash &&
          <>
            <div>
              <p>Hash: {hash}</p>
              <p>Noce: {nonce}</p>
              <p>Number: {number}</p>
            </div>
            <div style={{ maxWidth: "100%" }}>
              <ul className='card'>
                <p>Transactions: {transactions.map((tx, i) => {
                  return <div onClick={() => getBlockTransactions(tx)} key={i} style={{ border: "2px" }}>{i} | {tx}</div>;
                })}
                </p>
              </ul>
            </div>
          </>
        }
        </div>
    </div>
  );
}

export default App;
