import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import dicAppTranslations from '../../translations/app.json';

class DicApp extends Component {
  constructor(props) {
    super(props);
    props.addTranslation(dicAppTranslations);
  }

  render() {
    return (
      <div className='app'>
        <div className='container'>
          <div className='app__wrapper'>
            <div className='app__text'>
              <h1>ChhoeTaigi 台語辭典APP</h1>
              <div className='app__desc'>
                <Translate id='description' />
              </div>
              <ul className='app__links'>
                <li className='app__ios'>
                  <h2>Android版</h2>
                  <img className='app__qr' src='images/android@2x.png' />
                  <a className='app__kesimi' target="_blank" href="https://www.zeczec.com/projects/taibun-kesimi">
                    <Translate id='sponsor' />
                  </a>
                </li>
                <li className='app__android'>
                  <h2>iOS版</h2>
                  <img className='app__qr' src='images/android@2x.png' />
                  <a className='app__kesimi' target="_blank" href="https://www.zeczec.com/projects/taibun-kesimi">
                    <Translate id='sponsor' />
                  </a>
                </li>
              </ul>
            </div>
            <div className='app__img'>
              <img src='images/app_pic@2x.png' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocalize(withRouter(DicApp));