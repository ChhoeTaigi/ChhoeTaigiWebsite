import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

import Landing from './Landing';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import AllDics from './AllDics';
import Update from './Update';
import Detail from './Detail';
import { About } from './About';

// Landing page
export default class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/about' component={About} />
                    <Redirect to='/' />
                </Switch>
            </main>
        );
    }
}

// formal
/* export default class Main extends Component {
    render() {
        const detailPath = getDetailPath();
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={BasicSearch} />
                    <Route exact path='/advanced' component={AdvancedSearch} />
                    <Route exact path='/all' component={AllDics} />
                    <Route exact path={detailPath} component={Detail} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/update' component={Update} />
                    <Redirect to='/' />
                </Switch>
            </main>
        );
    }
} */

function getDetailPath() {
    let dic = DicStruct.map((e) => e.name);
    return '/:dictionary(' + dic.join('|') +')/:id';
}