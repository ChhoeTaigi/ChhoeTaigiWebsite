import React from 'react';
import { Link } from 'react-router-dom'

import '../../public/stylesheets/landing.css';

export default Landing = () => {
    return (
        <div>
            <img id='landing' src='images/landingKV@2x.png' width='879' height='346' />
            <Link id='more' to='/about'>了解更多</Link>
        </div>
    )
}