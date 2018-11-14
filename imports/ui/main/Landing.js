import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            background_height: window.innerHeight - 204,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 204,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <div style={{minHeight: this.state.background_height + 'px'}}>
                <img id='landing' src='images/landingKV@2x.png' width='879' height='346' />
                <Link id='more' to='/liaukai'>了解更多</Link>
            </div>
        );
    }
}