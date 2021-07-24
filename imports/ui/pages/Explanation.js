import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import explanationTranslations from "../../translations/explanation.json";

class Explanation extends Component {
  constructor(props) {
    super(props);

    props.addTranslation(explanationTranslations);

    this.state = {
      background_height: window.innerHeight - 96,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({
      background_height: window.innerHeight - 96,
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        id="explanation-container"
        style={{ minHeight: this.state.background_height + "px" }}
      >
        <h1 id="explanation-title">
          <Translate id="explanation" />
        </h1>
        <div id="explanation-sec-1">
          <h2 className="explanation-subtitle">
            <Translate id="method" />
          </h2>
          <ul>
            <li className="explanation-li">
              <Translate id="equals" />
            </li>
            <li className="explanation-li">
              <Translate id="contains" />
            </li>
          </ul>
        </div>
        <div id="explanation-sec-2">
          <h2 className="explanation-subtitle">
            <Translate id="condition" />
          </h2>
          <ul>
            <li className="explanation-li">
              <Translate id="lmj-tb" />
              <table className="explanation-table">
                <tbody>
                  <tr>
                    <th>
                      <Translate id="poj-input" />
                    </th>
                    <td></td>
                    <td>
                      <Translate id="poj-num" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Translate id="lmj-input" />
                    </th>
                    <td></td>
                    <td>
                      <Translate id="lmj-num" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Translate id="poj" />
                    </th>
                    <td></td>
                    <td>
                      <Translate id="poj-unicode" />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Translate id="lmj" />
                    </th>
                    <td></td>
                    <td>
                      <Translate id="lmj-unicode" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <table className="explanation-table-2">
              <tbody>
                <tr>
                  <th>
                    <Translate id="lmj-lianoeh" />
                  </th>
                  <td></td>
                  <td>
                    <Translate id="lmj-lianoeh-kaisoeh" />
                  </td>
                </tr>
                <tr>
                  <th>
                    <Translate id="lmj-sianglianoeh" />
                  </th>
                  <td></td>
                  <td>
                    <Translate id="lmj-sianglianoeh-kaisoeh" />
                  </td>
                </tr>
              </tbody>
            </table>
            <li className="explanation-li">
              <Translate id="tb" />
            </li>
            <li className="explanation-li">
              <Translate id="hb" />
            </li>
            <li className="explanation-li">
              <Translate id="en" />
            </li>
          </ul>
        </div>
        <div id="explanation-sec-3">
          <h2 className="explanation-subtitle">
            <Translate id="regex" />
          </h2>
          <h3 className="explanation-subtitle2">
            <Translate id="jimho-jigoan" />
          </h3>
          <span className="explanation-content">
            <Translate id="jimho-jigoan-le1" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="1e-jigoan" />
          </h3>
          <span className="explanation-content">
            <Translate id="1e-jigoan-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="1e-imchat" />
          </h3>
          <span className="explanation-content">
            <Translate id="1e-imchat-le" />
          </span>
          <span className="explanation-content">
            <Translate id="1e-imchat-le2" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="hanche-khuithau" />
          </h3>
          <span className="explanation-content">
            <Translate id="hanche-khuithau-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="hanche-kiatsok" />
          </h3>
          <span className="explanation-content">
            <Translate id="hanche-kiatsok-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="choanpoo-sianntiau" />
          </h3>
          <span className="explanation-content">
            <Translate id="choanpoo-sianntiau-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="ahun-jisu" />
          </h3>
          <span className="explanation-content">
            <Translate id="ahun-jisu-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="bokang-khiunnkhau" />
          </h3>
          <span className="explanation-content">
            <Translate id="bokang-khiunnkhau-le" />
          </span>
          <h3 className="explanation-subtitle2">
            <Translate id="tionghok-e" />
          </h3>
          <span className="explanation-content">
            <Translate id="tionghok-e-le1" />
          </span>
          <span className="explanation-content">
            <Translate id="tionghok-e-le2" />
          </span>
        </div>
        <div id="explanation-note">
          <Translate id="contact" />
        </div>
      </div>
    );
  }
}

export default withLocalize(withRouter(Explanation));
