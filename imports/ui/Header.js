import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import '../../public/stylesheets/global.css'
import '../../public/stylesheets/header.css'

/*
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
*/

class Header extends Component {
    render() {
        var currentLocation = this.props.location.pathname

        return (
            <header>
                <div className='fix-width-center'>
                    <img id='logo' src='images/logo@2x.png' width='194' height='32' />
                    <div id='header-right'>
                        <a id='FB-link' className='menu-item' href='https://www.facebook.com/ChhoeTaigi/'></a>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/about' ? 'menu-item-select' : '')} to='/about'>關於找台語</Link>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/' ? 'menu-item-select' : '')} to='/'>首頁</Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);