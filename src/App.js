import React, { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import Button from 'react-bootstrap/Button';
import Account from './components/Account';
import Header from './components/Header';
import Nav from './components/Content';
import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    async function getBlockInfo() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockInfo(); 
  },[]);

  function accountInfo() {
    setShowAccount(true);
  }

  return (
    <div className="App">
      <div className='container'>
        <Header blockNumber={blockNumber} />
        {!showAccount && <Nav alchemy={alchemy} />}
        {!showAccount && <Button onClick={accountInfo}>Show Account Information</Button>}
        {showAccount && <Account alchemy={alchemy} />}
      </div>
    </div>
  );
}

export default App;