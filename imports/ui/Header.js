import React from 'react';
import { Link } from 'react-router-dom'

export const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>首頁</Link></li>
                <li><Link to='/advanced'>進階搜尋</Link></li>
                <li><Link to='/about'>關於找台語</Link></li>
            </ul>
        </nav>
    </header>
);