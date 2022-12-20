import React from "react";
import HeaderCSS from "./Header.module.css";



const Header = (props) => {
    const { blockNumber} = props;

    return (
        <header className="card">
            <h2>Welcome to Viken Block Explorer</h2>
            <h4>Current: {blockNumber}</h4>
        </header>
    )
}

export default Header