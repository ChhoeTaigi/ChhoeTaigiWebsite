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
    }

    render() {
        var currentLocation = this.props.location.pathname
        if (currentLocation === '/explanation' || currentLocation === '/all' || currentLocation === '/single')
            currentLocation = '/';

        return (
            <header className='site-header'>
                <div className='container'>
                    <Link to='/' >
                        <img className='logo' src='/images/logo@2x.png' width='194' height='32' />    
                    </Link>
                    <nav className='site-nav'>
                        <ul>
                            <li>
                                <Link className={currentLocation == '/' ? 'active' : ''} to='/'><Translate id="basic" /></Link>
                            </li>
                            <li>
                                <Link className={currentLocation == '/chinkai' ? 'active' : ''} to='/chinkai'><Translate id="advanced" /></Link>
                            </li>
                            <li>
                                <Link className={currentLocation == '/app' ? 'active' : ''} to='/app'><Translate id="app" /></Link>
                            </li>
                            <li>
                                <Link className={currentLocation == '/liaukai' ? 'active' : ''} to='/liaukai'><Translate id="about" /></Link>
                            </li>
                            <li>
                                <Link id='FB-link' className='menu-item' to={{pathname:'https://www.facebook.com/ChhoeTaigi/'}} target='_blank'><span className='sr-only'>ChhoeTaigi Facebook</span></Link>
                            </li>
                        </ul>                     
                    </nav>
                </div>
            </header>
        );
    }
}

export default withLocalize(withRouter(Header));