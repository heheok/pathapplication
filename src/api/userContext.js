import { AsyncStorage } from "react-native";

export const setUserContext = async user => {
  await AsyncStorage.setItem("userContext", JSON.stringify(user));
  return true;
};

export const getUserContext = async () => {
  const userContext = await AsyncStorage.getItem("userContext");
  return await JSON.parse(userContext);
};

export const removeUserContext = async () => {
  await AsyncStorage.removeItem("userContext");
  return true;
};
