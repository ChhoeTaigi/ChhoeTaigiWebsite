import React from 'react';
import { Link } from 'react-router-dom'

export const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>首頁</Link></li>
            </ul>
        </nav>
    </header>
);