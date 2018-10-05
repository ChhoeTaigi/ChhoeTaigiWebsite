import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import explanationTranslations from '../translations/explanation.json';

class Explanation extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(explanationTranslations);

        this.state = {
            background_height: window.innerHeight - 96,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 96,
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
            <div id='explanation-container' style={{minHeight: this.state.background_height + 'px'}}>
                <h1 id='explanation-title'><Translate id='explanation' /></h1>
                <div id='explanation-sec-1'>
                    <h2 className='explanation-subtitle'><Translate id='method' /></h2>
                    <ul>
                        <li className='explanation-li'><Translate id='equals' /></li>
                        <li className='explanation-li'><Translate id='contains' /></li>
                    </ul>
                </div>
                <div id='explanation-sec-2'>
                    <h2 className='explanation-subtitle'><Translate id='condition' /></h2>
                    <ul>
                        <li className='explanation-li'><Translate id='lmj-tb' />
                            <table className='explanation-table'>
                                <tbody>
                                    <tr>
                                        <th><Translate id='poj-input' /></th>
                                        <td></td>
                                        <td><Translate id='poj-num' /></td>
                                    </tr>
                                    <tr>
                                        <th><Translate id='lmj-input' /></th>
                                        <td></td>
                                        <td><Translate id='lmj-num' /></td>
                                    </tr>
                                    <tr>
                                        <th><Translate id='poj' /></th>
                                        <td></td>
                                        <td><Translate id='poj-unicode' /></td>
                                    </tr>
                                    <tr>
                                        <th><Translate id='lmj' /></th>
                                        <td></td>
                                        <td><Translate id='lmj-unicode' /></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </li>
                        <li className='explanation-li'><Translate id='tb' /></li>
                        <li className='explanation-li'><Translate id='hb' /></li>
                        <li className='explanation-li'><Translate id='en' /></li>
                    </ul>
                </div>
                <div id='explanation-sec-3'>
                    <h2 className='explanation-subtitle'><Translate id='wildcard' /></h2>
                    <h3 className='explanation-subtitle2'><Translate id='any' /></h3>
                    <span className='explanation-content'><Translate id='any-ex' /></span>
                    <h3 className='explanation-subtitle2'><Translate id='one' /></h3>
                    <span className='explanation-content'><Translate id='one-ex' /></span>
                </div>
                <div id='explanation-note'><Translate id='contact' /></div>
            </div>
        );
    }
}

export default withLocalize(withRouter(Explanation));