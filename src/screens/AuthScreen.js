import React, { PureComponent } from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../store/reducers";
import { connect } from "react-redux";

class AuthScreen extends PureComponent {
  state = {
    isSubmitting: false,
    errorMessage: false
  };

  onLoginSubmit = async ({ username, password }) => {
    this.setState({ isSubmitting: true });
    await this.props.login({ username, password });
  };
  render() {
    const { isSubmitting, errorMessage } = this.state;
    return (
      <LoginForm
        onSignIn={this.onSignIn}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onLoginSubmit={this.onLoginSubmit}
      />
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
