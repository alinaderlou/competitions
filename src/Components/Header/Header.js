import React, {useState} from 'react';
import './Header.scss'
import {FaSearch} from 'react-icons/fa';

const Header = ({searchValue, onSearchValueChanged}) => {
    return (
        <header className="header-wrapper">
            <div className="col-1">
                <div className="logo-wrapper">
                    <img className="logo" src="/red-wolf-gallery/Images/logo.png" alt="red-wolf-gallery"/>
                </div>
                <div className="search-wrapper">
                    <div className="search">
                        <div className="icon">
                            <FaSearch/>
                        </div>
                        <input
                            type="text"
                            value={searchValue}
                            placeholder="Search photo"
                            onChange={(e => {
                                onSearchValueChanged(e.target.value)
                            })}/>
                    </div>
                </div>
            </div>

            <div className="nav-items-wrapper">
                <ul className="nav-items">
                    <li className="nav-item">
                        Home
                    </li>
                    <li className="nav-item">
                        Blog
                    </li>
                    <li className="nav-item">
                        Contact Us
                    </li>
                </ul>
                <div className="auth-wrapper">
                    <div>Login</div>
                    <span className="separator">/</span>
                    <div>Sign up</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
