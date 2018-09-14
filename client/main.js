import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import ReactGA from 'react-ga';

import '../imports/startup/both';
import '../imports/startup/client';
import '../imports/stylesheets';

import './main.html';
import App from '../imports/ui/App';

Meteor.startup(() => {
  ReactGA.initialize([{
    trackingId: 'UA-124171318-1'
  }, {
    trackingId: 'UA-124171318-2'
  }], { debug: true });

  render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('render-target'));
});