import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

import Landing from './Landing';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import AllDics from './AllDics';
import SingleDic from './SingleDic';
import Update from './Update';
import Detail from './Detail';
import { About } from './About';
import Account from './Account';

// Landing page
/* class Main extends Component {
    render() {
        let additionalRoute = [];
        if (true) {
            additionalRoute = [
                <Route key='landing' exact path='/' component={Landing} />,
                <Route key='about' exact path='/about' component={About} />,
            ];
        }
        return (
            <main>
                <Switch>
                    {additionalRoute}
                    <Route exact path='/account' component={Account} />
                    <Redirect to='/' />
                </Switch>
            </main>
        );
    }
} */

// formal
class Main extends Component {
    render() {

        const detailPath = getDetailPath();
        let additionalRoute = [];
        if (Meteor.userId()) {
            additionalRoute = [
                <Route key='basic' exact path='/' component={BasicSearch} />,
                <Route key='landing' exact path='/landing' component={Landing} />,
                <Route key='advanced' exact path='/advanced' component={AdvancedSearch} />,
                <Route key='all' exact path='/all' component={AllDics} />,
                <Route key='single' exact path='/single' component={SingleDic} />,
                <Route key='detail' exact path={detailPath} component={Detail} />,
                <Route key='about' exact path='/about' component={About} />,
                <Route key='update' exact path='/update' component={Update} />,
            ];
        }
        return (
            <main>
                <Switch>
                    {additionalRoute}
                    <Route exact path='/account' component={Account} />
                    <Redirect to='/' />
                </Switch>
            </main>
        );
    }
}

export default withRouter(Main);

function getDetailPath() {
    let dic = DicStruct.map((e) => e.name);
    return '/:dictionary(' + dic.join('|') +')/:id';
}