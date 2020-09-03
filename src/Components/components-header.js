import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function Header(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand mx-auto">Face Detection</Link>
        </nav>
    );
}

export default Header;