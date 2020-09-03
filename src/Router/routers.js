import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

//Component
import Header from '../Components/components-header';

//Pages
import MainImage from '../Pages/imageDetect';

export default function Routers(){
    return(
        <div>
            <Router>
                <Header />
                <div className="container" >
                    <MainImage />
                </div>
            </Router>
        </div>
    );
}
