import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}