import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default () => (
  <View style={styles.container}>
    <LottieView source={require("../animations/flow.json")} autoPlay loop />
    <StatusBar barStyle="default" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  }
});
