import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../resources/logo-wh.webp';

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer_inner">
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/hostel-rooms">Hostels</Link></li>
                        <li><Link to="/">Apartments</Link></li>
                        <li><Link to="/">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer_logo_div">
                    <Link to="/"><img src={Logo} alt="" /></Link>
                    <h5>Castel Inn</h5>
                </div>
                <div>
                    <p>Castel Inn © 2021</p>
                </div>
            </div>
            <p>Designed and Developed by <a href="https://oreolaleye.com.ng">Ore Olaleye</a></p>
        </div>
    )
}

export default Footer
