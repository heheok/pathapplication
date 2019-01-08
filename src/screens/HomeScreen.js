import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  WebView,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/reducers";
import Loader from "../components/Loader";

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = "(" + String(patchPostMessageFunction) + ")();";

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    const currentLayout = props.layouts.filter(
      layout => layout.id === props.userContext.layoutId
    )[0];

    this.state = {
      tabInfo: currentLayout.tabs[props.navigation.state.key]
    };
    this.webView = null;
  }

  renderLoading = () => <Loader />;

  sendPostMessage(webView) {
    webView.postMessage("Post message from react native");
  }

  onMessage = event => {
    if (event.nativeEvent.data === "logout") {
      console.log("trigger logout");
      AsyncStorage.clear();
      this.props.logout();
    } else {
      console.log(event.nativeEvent.data);
    }
  };

  render() {
    const {
      tabInfo: { url }
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.sendPostMessage(this.webView)}
        >
          <Text>Send Message To URL</Text>
        </TouchableOpacity>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          renderLoading={this.renderLoading}
          startInLoadingState
          onMessage={this.onMessage}
          ref={webView => (this.webView = webView)}
          injectedJavaScript={patchPostMessageJsCode}
        />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Details");
  };

  _signOutAsync = async () => {
    await AsyncStorage.removeItem("userContext");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150
  },
  button: {
    marginTop: 80,
    marginBottom: 10,
    color: "red"
  }
});

const mapStateToProps = ({ layouts, userContext }) => ({
  layouts,
  userContext
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
