import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import headerTranslations from '../translations/header.json';

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
            <header>
                <div className='fix-width-center'>
                    <img id='logo' src='/images/logo@2x.png' width='194' height='32' />
                    <div id='header-right'>
                        <a id='FB-link' className='menu-item' href='https://www.facebook.com/ChhoeTaigi/' target='_blank'></a>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/about' ? 'menu-item-select' : '')} to='/about'><Translate id="about" /></Link>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/dic-app' ? 'menu-item-select' : '')} to='/dic-app'><Translate id="dic-app" /></Link>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/advanced' ? 'menu-item-select' : '')} to='/advanced'><Translate id="advanced" /></Link>
                        <Link className={'menu-text menu-item ' + (currentLocation == '/' ? 'menu-item-select' : '')} to='/'><Translate id="basic" /></Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default withLocalize(withRouter(Header));