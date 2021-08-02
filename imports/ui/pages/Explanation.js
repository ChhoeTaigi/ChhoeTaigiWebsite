import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import explanationTranslations from "../../translations/explanation.json";

class Explanation extends Component {
  constructor(props) {
    super(props);
    props.addTranslation(explanationTranslations);
  }


  render() {
    return (
      <div className='container explanation'>
        <h1><Translate id='explanation' /></h1>
        <section>
          <h2><Translate id='method' /></h2>
          <ul className='explanation__ul'>
            <li><Translate id='equals' /></li>
            <li><Translate id='contains' /></li>
          </ul>
        </section>
        <section>
          <h2><Translate id='condition' /></h2>
          <ul className='explanation__ul'>
            <li><Translate id='lmj-tb' />
              <ul className='lmj-note'>
                  <li>
                      <h3><Translate id="poj-input" /></h3>
                      <div><Translate id="poj-num" /></div>
                  </li>
                  <li>
                      <h3><Translate id="lmj-input" /></h3>
                      <div><Translate id="lmj-num" /></div>
                  </li>
                  <li>
                      <h3><Translate id="poj" /></h3>
                      <div><Translate id="poj-unicode" /></div>
                  </li>
                  <li>
                      <h3><Translate id="lmj" /></h3>
                      <div><Translate id="lmj-unicode" /></div>
                  </li>
              </ul>
              <ul className='lmj-note'>
                <li>
                  <h3><Translate id="lmj-lianoeh" /></h3>
                  <div><Translate id="lmj-lianoeh-kaisoeh" /></div>
                </li>
                <li>
                  <h3><Translate id="lmj-sianglianoeh" /></h3>
                  <div><Translate id="lmj-sianglianoeh-kaisoeh" /></div>
                </li>
              </ul>
            </li>
            <li><Translate id='tb' /></li>
            <li><Translate id='hb' /></li>
            <li><Translate id='en' /></li>
          </ul>
        </section>
        <section>
          <h2><Translate id='regex' /></h2>
          <ul className="regex-note">
            <li>
              <h3><Translate id="jimho-jigoan" /></h3>
              <div className='regex-note__content'>
                <Translate id='jimho-jigoan-le1' />
              </div>
            </li>
            <li>
              <h3><Translate id='1e-jigoan' /></h3>
              <div className='regex-note__content'>
                <Translate id='1e-jigoan-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='1e-imchat' /></h3>
              <div className='regex-note__content'>
                <ol>
                  <li><Translate id="1e-imchat-le" /></li>
                  <li><Translate id="1e-imchat-le2" /></li>
                </ol>
              </div>
            </li>
            <li>
              <h3><Translate id='hanche-khuithau' /></h3>
              <div className='regex-note__content'>
                  <Translate id='hanche-khuithau-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='hanche-kiatsok' /></h3>
              <div className='regex-note__content'>
                <Translate id='hanche-kiatsok-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='choanpoo-sianntiau' /></h3>
              <div className='regex-note__content'>
                <Translate id='choanpoo-sianntiau-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='ahun-jisu' /></h3>
              <div className='regex-note__content'>
                <Translate id='ahun-jisu-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='bokang-khiunnkhau' /></h3>
              <div className='regex-note__content'>
                <Translate id='bokang-khiunnkhau-le' />
              </div>
            </li>
            <li>
              <h3><Translate id='tionghok-e' /></h3>
              <div className='regex-note__content'>
                <ol>
                  <li><Translate id="tionghok-e-le1" /></li>
                  <li><Translate id="tionghok-e-le2" /></li>
                </ol>
              </div>
            </li>
          </ul>
        </section>
        <div className='explanation__note'>
          <Translate id="contact" />
        </div>
      </div>
    );
  }
}

export default withLocalize(withRouter(Explanation));