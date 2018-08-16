import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

import SearchAll from './SearchAll';
import Update from './Update';
import Detail from './Detail';
import SearchSingle from './SearchSingle';
import { About } from './About';

export default class Main extends Component {
    render() {
        const detailPath = getDetailPath();
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={SearchAll} />
                    <Route exact path={detailPath} component={Detail} />
                    <Route exact path='/advanced' component={SearchSingle} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/update' component={Update} />
                    
                </Switch>
            </main>
        );
    }
}

function getDetailPath() {
    let dic = DicStruct.map((e) => e.name);
    return '/:dictionary(' + dic.join('|') +')/:id';
}