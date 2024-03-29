/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import autobind from 'react-autobind';

import { Wizard, StyleProvider } from 'losen';
import data from './api/bygg-uten-soke.json';
import dataExport from './exports/data-export';
import Intro from './pages/Intro';
import store from './store';

export default class App extends Component {
  static propTypes = {
    translations: PropTypes.object,
  };

  static defaultProps = {
    translations: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      intro: false, // CHANGE TO TRUE
    };
    autobind(this);
  }

  closeIntro() {
    this.setState({ intro: false });
    window.scrollTo(0, 0);
  }

  showIntro() {
    this.setState({ intro: true });
    window.scrollTo(0, 0);
  }

  render() {
    if (this.state.intro) {
      return (
        <Provider store={store}>
          <StyleProvider>
            <Intro close={this.closeIntro} />
          </StyleProvider>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <Wizard
          wizard={data}
          exports={{ dataExport }}
          translations={this.props.translations}
          showIntro={this.showIntro}
        />
      </Provider>
    );
  }
}
