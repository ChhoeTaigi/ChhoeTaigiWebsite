import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { initGA } from '../imports/api/analytics';
import '../imports/startup/both';
import '../imports/startup/client';
import '../imports/stylesheets';

import './main.html';
import App from '../imports/ui/App';

Meteor.startup(() => {
  render(<Main />, document.getElementById('render-target'));
});

class Main extends Component {
  constructor(props) {
    super(props);
    initGA();
  }

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}