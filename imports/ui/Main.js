import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SearchAll from './SearchAll';
import Update from './Update';

export const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={SearchAll} />
            <Route exact path='/update' component={Update} />
            <Redirect to='/' />
        </Switch>
    </main>
);