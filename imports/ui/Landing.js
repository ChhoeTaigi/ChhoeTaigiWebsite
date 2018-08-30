import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../../public/stylesheets/landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            background_height: window.innerHeight - 96,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                background_height: window.innerHeight - 96,
            });
        });
    }

    render() {
        return (
            <div style={{height: this.state.background_height + 'px'}}>
                <img id='landing' src='images/landingKV@2x.png' width='879' height='346' />
                <Link id='more' to='/about'>了解更多</Link>
            </div>
        );
    }
}