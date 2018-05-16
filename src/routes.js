import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Details from './components/Details';

export default class Routes extends Component {
  static propTypes = {
    navLocation: PropTypes.string,
    nav: PropTypes.func,
  }
  // we dump location handler in here to manage the app flow
  render() {
    const { navLocation } = this.props;
    return (
      <MainNavigator key="main-navigator" />
    );
  }
}
//only two pages in the app, relatively simple StackNavigator
const MainNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
        gesturesEnabled: false,
    }
  },
  Details: {
    screen: Details,
  },
}, {
  initialRouteName: 'Home',
});
