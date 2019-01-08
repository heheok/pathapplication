import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { Formik } from "formik";
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from "react-native-formik";
import * as Yup from "yup";
import { compose } from "recompose";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı Adı alanı zorunludur."),
  password: Yup.string().required("Şifre alanı zorunludur.")
});

const LoginForm = ({ isSubmitting, onLoginSubmit, errorMessage }) => {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={onLoginSubmit}
        validationSchema={validationSchema}
        render={props => {
          return (
            <Form style={styles.form}>
              <MyInput
                disabled={isSubmitting}
                label="Kullanıcı Adı"
                name="username"
                type="name"
                autoCapitalize="none"
              />
              <MyInput
                disabled={isSubmitting}
                label="Şifre"
                name="password"
                type="password"
                autoCapitalize="none"
              />
              {isSubmitting ? (
                <ActivityIndicator style={{ marginTop: 10 }} />
              ) : (
                <Button onPress={props.handleSubmit} title="Giriş Yap" />
              )}
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </Form>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  form: {
    width: Dimensions.get("window").width - 40
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10
  }
});

export default LoginForm;
