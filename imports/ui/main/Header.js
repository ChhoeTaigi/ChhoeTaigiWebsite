import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import headerTranslations from '../../translations/header.json';

// Formal
class Header extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(headerTranslations);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.closeMenu();
        }
    }

    toggleMenu() {
        document.getElementById('site-nav-list').classList.toggle('active');
    }

    closeMenu() {
        document.getElementById('site-nav-list').classList.remove('active');
    }

    render() {
        var currentLocation = this.props.location.pathname
        if (currentLocation === '/explanation' || currentLocation === '/all' || currentLocation === '/single')
            currentLocation = '/';

        return (
            <header className='site-header'>
                <div className='container'>
                    <h1>
                        <Link to='/' >
                            <img className='logo' src='/images/logo@2x.png' alt='ChhoeTaigi 台語辭典⁺' />
                        </Link>
                    </h1>
                    <nav className='site-nav'>
                        <button className='site-nav__menu-toggle' onClick={this.toggleMenu}>
                            <span className='sr-only'>Toggle menu</span>
                        </button>
                        <ul id='site-nav-list' ref={this.wrapperRef}>
                            <li>
                                <Link className={currentLocation === '/' ? 'active' : ''} to='/' onClick={this.closeMenu}><Translate id="menu_basic" /></Link>
                            </li>
                            <li>
                                <Link className={currentLocation === '/chinkai' ? 'active' : ''} to='/chinkai' onClick={this.closeMenu}><Translate id="menu_advanced" /></Link>
                            </li>
                            <li>
                                <Link className={currentLocation === '/annachhoe' ? 'active' : ''} to='/annachhoe' onClick={this.closeMenu}><Translate id="anchoannchhoe" /></Link>
                            </li>
                            {/* <li>
                                <Link className={currentLocation === '/app' ? 'active' : ''} to='/app' onClick={this.closeMenu}><Translate id="app" /></Link>
                            </li> */}
                            <li>
                                <Link className={currentLocation === '/liaukai' ? 'active' : ''} to='/liaukai' onClick={this.closeMenu}><Translate id="about" /></Link>
                            </li>
                            <li>
                                <Link className='koankhoan-link' to={{ pathname: 'https://r.zecz.ec/vpKd' }} target='_blank'><Translate id="koankhoan" /></Link>
                            </li>
                        </ul>
                        <Link id='FB-link' className='menu-item' to={{ pathname: 'https://www.facebook.com/ChhoeTaigi/' }} target='_blank'><span className='sr-only'>ChhoeTaigi Facebook</span></Link>
                    </nav>
                </div>
            </header>
        );
    }
}

export default withLocalize(withRouter(Header));