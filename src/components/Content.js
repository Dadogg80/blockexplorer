import React from "react";
import ContentCSS from './Content.module.css';

const Nav = (props) => {
    const { hash, nonce, number } = props;
    
    return (
        <>
        <div className="card">
            <h3>Block Information:</h3>
            <p>Hash: {hash}</p>
            <p>Nonce: {nonce}</p>
            <p>BlockNumber: {number}</p>
            <button className={ContentCSS.btn}>More</button>
        </div>
        </>
    )
}

export default Nav