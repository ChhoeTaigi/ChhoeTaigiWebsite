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
          <h2><Translate id='definition' /></h2>
          <ul className='explanation__ul'>
            <li><Translate id='lmj-tb' />
              <ul className='note-block'>
                <li>
                  <h3><Translate id="definition-lmj-poj" /></h3>
                  <div><Translate id="definition-lmj-poj-kaisoeh" /></div>
                </li>
                <li>
                  <h3><Translate id="definition-lmj-kip" /></h3>
                  <div><Translate id="definition-lmj-kip-kaisoeh" /></div>
                </li>
              </ul>
              <ul className='note-block'>
                <li>
                  <h3><Translate id="definition-lmj-lianoeh" /></h3>
                  <div><Translate id="definition-lmj-lianoeh-kaisoeh" /></div>
                </li>
                <li>
                  <h3><Translate id="definition-lmj-sianglianoeh" /></h3>
                  <div><Translate id="definition-lmj-sianglianoeh-kaisoeh" /></div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
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
              <ul className='note-block'>
                <li>
                  <h3><Translate id="poj-input" /></h3>
                  <div><Translate id="poj-num" /></div>
                </li>
                <li>
                  <h3><Translate id="poj" /></h3>
                  <div><Translate id="poj-unicode" /></div>
                </li>
                <li>
                  <h3><Translate id="lmj-input" /></h3>
                  <div><Translate id="lmj-num" /></div>
                </li>
                <li>
                  <h3><Translate id="lmj" /></h3>
                  <div><Translate id="lmj-unicode" /></div>
                </li>
              </ul>
              <ul className='note-block'>
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
            <li><Translate id='lang_hanlo' /></li>
            <li><Translate id='lang_engbun' /></li>
            <li><Translate id='lang_jitbun' /></li>
            <li><Translate id='lang_tiongbun' /></li>
          </ul>
        </section>
        <section>
          <h2><Translate id='regex' /></h2>
          <ul className='explanation__ul'>
            <li><Translate id='regex_descriptions' />
              <ul className='note-block'>
                <li>
                  <h3><Translate id="regex-desc-1" /></h3>
                  <div><Translate id="regex-desc-1-content" /></div>
                </li>
                <li>
                  <h3><Translate id="regex-desc-2" /></h3>
                  <div><Translate id="regex-desc-2-content" /></div>
                </li>
                <li>
                  <h3><Translate id="regex-desc-3" /></h3>
                  <div><Translate id="regex-desc-3-content" /></div>
                </li>
              </ul>
            </li>
            <li><Translate id='regex_features' /></li>
            <ul className="regex-note">
              <li>
                <h3><Translate id='choanpoo-sianntiau' /></h3>
                <div className='regex-note__content'>
                  <Translate id='choanpoo-sianntiau-le' />
                </div>
              </li>
              <li>
                <h3><Translate id='1e-imchat' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id="1e-imchat-le1" /></li>
                    <li><Translate id="1e-imchat-le2" /></li>
                  </ol>
                </div>
              </li>
              <li>
                <h3><Translate id='1e-imchat-chinkai' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id="1e-imchat-chinkai-le1" /></li>
                    <li><Translate id="1e-imchat-chinkai-le2" /></li>
                    <li><Translate id="1e-imchat-chinkai-le3" /></li>
                  </ol>
                </div>
              </li>
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
                <h3><Translate id='kooteng-imchat' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id="kooteng-imchat-le" /></li>
                    <li><Translate id="kooteng-imchat-le2" /></li>
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
                <h3><Translate id='ahun-jisu' /></h3>
                <div className='regex-note__content'>
                  <Translate id='ahun-jisu-le' />
                </div>
              </li>
              <li>
                <h3><Translate id='bokang-phengsia' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id='bokang-phengsia-le1' /></li>
                    <li><Translate id='bokang-phengsia-le2' /></li>
                    <li><Translate id='bokang-phengsia-le3' /></li>
                  </ol>
                </div>
              </li>
              <li>
                <h3><Translate id='tionghok-e' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id="tionghok-e-le1" /></li>
                    <li><Translate id="tionghok-e-le2" /></li>
                    <li><Translate id="tionghok-e-le3" /></li>
                    <li><Translate id="tionghok-e-le4" /></li>
                    <li><Translate id="tionghok-e-le5" /></li>
                  </ol>
                </div>
              </li>
              <li>
                <h3><Translate id='teksu-regex-backslash' /></h3>
                <div className='regex-note__content'>
                  <ol>
                    <li><Translate id="teksu-regex-backslash-le1" /></li>
                    <li><Translate id="teksu-regex-backslash-le2" /></li>
                    <li><Translate id="teksu-regex-backslash-le3" /></li>
                    <li><Translate id="teksu-regex-backslash-le4" /></li>
                  </ol>
                </div>
              </li>
            </ul>
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