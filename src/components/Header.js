import React from "react";
import HeaderCSS from "./Header.module.css";



const Header = (props) => {
    const { blockNumber } = props;
    return (
        <header className="card">
            <h2>Block Number:</h2>
            <h3>{blockNumber}</h3>
        </header>
    )
}

export default Header