import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import TransactionData from "./Modal";
import ContentCSS from './Content.module.css';

const Nav = (props) => {

  const [transactions, setTransactions] = useState();
  const [nonce, setNonce] = useState();
  const [hash, setHash] = useState();
  const [number, setNumber] = useState();
  const [receipt, setReceipt] = useState();
  const [modalShow, setModalShow] = useState(false);

  const { alchemy } = props;

  const getBlock = async () => {
    const valuesArray = await alchemy.core.getBlock();
    setTransactions(valuesArray["transactions"]);
    setHash(valuesArray["hash"]);
    setNonce(valuesArray["nonce"]);
    setNumber(valuesArray["number"]);
  }

  const getBlockTransactions = async (hash) => {
    const _receipt = await alchemy.core.getTransactionReceipt(hash);
    setReceipt(_receipt);
    console.log(receipt);
    setModalShow(true);
  }

  return (

    <div className="card">
      <div>
        <Button className={ContentCSS.btn} onClick={() => getBlock()}>Get Block Data</Button>
      </div>
      {
        hash &&
        <>
          <div>
            <h3 style={{ margin: "30px" }}>Block Information:</h3>
            <hr style={{ margin: "40px" }} />
            <h4>Hash</h4>
            <label>{hash}</label>
            <h4>Nonce</h4>
            <label>{nonce}</label>
            <h4>Blocknumber</h4>
            <label>{number}</label>
            <hr style={{ margin: "40px" }} />
          </div>
          <div className='card' style={{ maxWidth: "100%" }}>
            <h3>Transactions:</h3>
            <ul>
              <div>{transactions.map((tx, i) => {
                return <div onClick={() => getBlockTransactions(tx)} key={i} style={{ padding: "10px 10px", }}><span style={{ fontWidth: "400px" }}> {i} |  </span>{tx}</div>;
              }/* , 
              <TransactionData
              show={modalShow}
              onHide={() => setModalShow(false)}
            /> */

              )}
              </div>
            </ul>
          </div>
        </>
      }
    </div>
  )
}

export default Nav