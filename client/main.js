import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/both';
import '../imports/startup/client';
import '../imports/stylesheets';

import './main.html';
import App from '../imports/ui/App';

Meteor.startup(() => {
  render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('render-target'));
});