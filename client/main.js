import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from "react-localize-redux";
import { CookiesProvider } from 'react-cookie';

import '../imports/startup/both';
import '../imports/startup/client';
import '../imports/stylesheets';

import './main.html';
import App from '../imports/ui/App';

Meteor.startup(() => {
  render(<Main />, document.getElementById('render-target'));
});

class Main extends Component {
  render() {
    return (
      <CookiesProvider>
        <LocalizeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizeProvider>
      </CookiesProvider>
    );
  }
}