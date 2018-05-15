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

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
