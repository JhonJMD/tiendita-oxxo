import React from 'react';
import { FaStore } from 'react-icons/fa';

function Header({ setVista }) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img
                        className="logo-text"
                        src="./public/assets/images/Asset+10OXXO.png"
                        alt="OXXO Logo"
                        onClick={() => setVista("inicio")}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
            <div className="yellow-bar"></div>
        </header>
    );
}

export default Header;