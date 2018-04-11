import * as React from 'react';

// components

// utils
import initTurn from '../../utils/initTurn';

export default class Pages extends React.Component {
  componentDidMount () {
    initTurn();
  };

  render () {
    return (
      <div className="flipbook-viewport">
        <div className="container">

          <div className="next-button"></div>
          <div className="prev-button"></div>

          <div className="flipbook">
            <div className="hard-cover-front"><div className="side"></div> </div>
            <div className="book-wrapper">
              <div className="book-container book-container-odd">
                <div className="book-content">
                </div>
              </div>
            </div>
            <div className="book-wrapper">
              <div className="book-container book-container-even">
                <div className="book-content">
                </div>
              </div>
            </div>
            <div className="hard-cover-back"><div className="side"></div> </div>
          </div>
          <div className="bottom">
            <div id="slider-bar" className="turnjs-slider">
              <div id="slider"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
