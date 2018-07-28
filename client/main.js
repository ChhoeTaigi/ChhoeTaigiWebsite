import React from 'react';
import { render } from 'react-dom';

import './main.html';
import Router from '../imports/router';

Meteor.startup(() => {
  render(Router, document.getElementById('render-target'));
});