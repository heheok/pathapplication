import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./store/createStore";

import Root from "./screens/Root";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
