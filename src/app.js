import React, { Component } from 'react';
import { BackHandler, Platform } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Routes from "./routes";

const store = configureStore();

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*** 
     * since some of the dependent libraries still use isMounted, we can hide the yellowbox
    * warning for the time being.  Please note nowhere in my code is the isMounted() lifecycle
    * method used
    ***/
    console.ignoredYellowBox = ['Warning: isMounted'];
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
