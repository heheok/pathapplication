import React, { PureComponent } from "react";
import { setUserContext, getUserContext } from "../api/userContext";
import { connect } from "react-redux";
import AuthScreen from "./AuthScreen";
import { getLayouts, hydrateUserContext } from "../store/reducers";
import Loader from "../components/Loader";
import { dymanicTabNavigatorCreator } from "../navigator";
import { createAppContainer } from "react-navigation";

class Root extends PureComponent {
  state = {
    authLoading: true
  };
  componentWillMount = async () => {
    //get layout information before doing anything else;
    this.props.getLayouts();
    const pastUserContext = await getUserContext();
    if (pastUserContext) {
      this.props.hydrateUserContext([pastUserContext]);
    }
    this.setState({ authLoading: false });
  };
  componentDidUpdate = async () => {
    const { authLoading } = this.state;
    const { userContext } = this.props;
    if (userContext.token) {
      await setUserContext(userContext);
    }
  };
  render() {
    const { layouts, loadingLayouts, userContext } = this.props;
    const { authLoading } = this.state;

    if (loadingLayouts || authLoading) {
      return <Loader />;
    } else if (!userContext.token) {
      return <AuthScreen />;
    } else {
      console.log(userContext);
      const AppNavContainer = createAppContainer(
        dymanicTabNavigatorCreator(layouts, userContext.layoutId)
      );
      return <AppNavContainer />;
    }
  }
}

const mapStateToProps = ({ layouts, loadingLayouts, userContext }) => ({
  layouts,
  loadingLayouts,
  userContext
});

const mapDispatchToProps = {
  getLayouts,
  hydrateUserContext
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
