import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DicStruct from '../../api/dicts/dictionary-struct';

import BasicSearch from '../search/basic/BasicSearch';
import AdvancedSearch from '../search/advanced/AdvancedSearch';
import Explanation from '../pages/Explanation';
import Search from '../../ui/search/components/Search';
import Update from '../pages/Update';
import Detail from '../search/components/Detail';
import About from '../pages/About';
import DicApp from '../pages/DicApp';
import Account from '../pages/Account';

// formal
class Main extends Component {
    render() {
        const currentLocation = this.props.location.pathname;
        let bgType;
        if (currentLocation === '/') {
            bgType = 'bg--darkgreen';
        }
        else if (currentLocation === '/chinkai') {
            bgType = 'bg--lightgreen';
        }
        else {
            bgType = '';
        }
        const detailPath = getDetailPath();
        let additionalRoute = [
            <Route key='basic' exact path='/' component={BasicSearch} />,
            <Route key='advanced' exact path='/chinkai' component={AdvancedSearch} />,
            <Route key='explanation' exact path='/annachhoe' component={Explanation} />,
            <Route key='search' exact path='/search' component={Search} />,
            <Route key='detail' exact path={detailPath} component={Detail} />,
            <Route key='about' exact path='/liaukai' component={About} />,
            // <Route key='app' exact path='/app' component={DicApp} />,
        ];
        if (Meteor.userId()) {
            additionalRoute.push(
                <Route key='update' exact path='/update' component={Update} />
            );
        }

        return (
            <main className={bgType}>
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
    return '/:dictionary(' + dic.join('|') + ')/:id';
}