import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './ui/App';
import Update from './ui/Update';

export default (
    <BrowserRouter>
        <Switch>
            <Route path='/update' component={Update} />
            <Route path='/' component={App} />
        </Switch>
    </BrowserRouter>
)