import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeScreen from "../src/screens/HomeScreen";
import FaIcon from "react-native-vector-icons/FontAwesome";
import ZoIcon from "react-native-vector-icons/Zocial";

export const dymanicTabNavigatorCreator = (tabData, selectedLayout) => {
  const { tabs } = tabData.filter(({ id }) => id === selectedLayout)[0];
  console.log("TABS:", tabs);
  const tabNavigationOptions = {};

  tabs.map((singleTab, index) => {
    tabNavigationOptions[index] = {
      screen: HomeScreen,
      path: `tab/${index}`,
      navigationOptions: ({ navigation }) => ({
        title: singleTab.title,
        tabBarLabel: singleTab.title,
        tabBarIcon: ({ tintColor }) => {
          if (singleTab["icon-family"] === "FontAwesome") {
            return <FaIcon name={singleTab.icon} size={20} color={tintColor} />;
          } else if (singleTab["icon-family"] === "Zocial") {
            return <ZoIcon name={singleTab.icon} size={20} color={tintColor} />;
          }
        }
      })
    };
  });

  return createBottomTabNavigator(tabNavigationOptions, {
    initialRouteName: "0",
    tabBarOptions: {
      activeTintColor: "#D4AF37",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white"
      }
    }
  });
};
