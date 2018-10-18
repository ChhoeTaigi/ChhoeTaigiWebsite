import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import Explanation from './Explanation';
import Search from './Search';
import Update from './Update';
import Detail from './Detail';
import About from './About';
import DicApp from './DicApp';
import Account from './Account';

// formal
class Main extends Component {
    render() {
        const detailPath = getDetailPath();
        let additionalRoute = [];
        if (Meteor.userId() || env === 'prod') {
            additionalRoute = [
                <Route key='basic' exact path='/' component={BasicSearch} />,
                <Route key='advanced' exact path='/chinkai' component={AdvancedSearch} />,
                <Route key='explanation' exact path='/annachhoe' component={Explanation} />,
                <Route key='search' exact path='/search' component={Search} />,
                <Route key='detail' exact path={detailPath} component={Detail} />,
                <Route key='about' exact path='/liaukai' component={About} />,
                <Route key='app' exact path='/app' component={DicApp} />,
            ];
            if (Meteor.userId()) {
                additionalRoute.push(
                    <Route key='update' exact path='/update' component={Update} />
                );
            }
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