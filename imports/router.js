import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './ui/App';
import Update from './ui/Update';

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/update' component={Update} />
        </Switch>
    </BrowserRouter>
)