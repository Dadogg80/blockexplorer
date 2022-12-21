import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Account = (props) => {
    const [address, setAddress] = useState("");
    const [tokenBalances, setTokenBalances] = useState({});
    const [ethBalance, setEthBalance] = useState();
    const { alchemy } = props;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const balance = await alchemy.core.getBalance(address, "latest");
        setEthBalance(balance["_hex"] / Math.pow(10, 18));
        const balances = await alchemy.core.getTokenBalances(address);
        console.log(balances);
      
        // Remove tokens with zero balance
        const nonZeroBalances = balances.tokenBalances.filter((token) => {
          return token.tokenBalance !== "0";
        });
      
        console.log(`Token balances of ${address} \n`);
    
    
        for (let token of nonZeroBalances) {
            // Get balance of token
            let balance = token.tokenBalance;
          
            // Get metadata of token
            const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
          
            // Compute token balance in human-readable format
            balance = balance / Math.pow(10, metadata.decimals);
            balance = balance.toFixed(2);
          
            // Add token to list of tokens
            setTokenBalances({ ...tokenBalances, [metadata.symbol]: { name: metadata.name, balance: balance, symbol: metadata.symbol } });
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Ethereum Address:</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Get Balances
                </Button>
            </Form>
            {tokenBalances && (
                <ul>
                   {Object.values(tokenBalances).map((token) => {
                       return (
                           <li key={token.symbol}>
                               {token.name}: {token.balance} {token.symbol}
                           </li>
                       );
                   })}
                </ul>
            )}
            {ethBalance && (
                <p>
                    Ether Balance: {ethBalance}{" "}
                </p>
            )}
        </div>
    );
};

export default Account;