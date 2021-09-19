import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InputTextField from "../components/InputTextField";
import { AuthContext } from "../context";
import Container from "./Container";

const SignUp = () => {
  const { signUp } = React.useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = () => {
    if (userName.trim() === "" || password.trim() === "") {
      alert("Username or password cannot be empty");
      return false;
    } else if (password.trim() !== confirmPassword.trim()) {
      alert("Confirm password does not match");
      return false;
    }
    return true;
  };

  return (
    <Container>
      <View style={{ width: 300 }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 80,
            alignSelf: "center",
            color: "#FCA048",
          }}
        >
          Sign up
        </Text>
        <View style={{ marginHorizontal: 5 }}>
          <InputTextField
            title="User Name"
            placeholderText="User name"
            value={userName}
            onChangeText={setUserName}
          />
          <InputTextField
            style={{ marginTop: 20 }}
            title="Password"
            isSecure={true}
            placeholderText="Password"
            value={password}
            onChangeText={setPassword}
          />
          <InputTextField
            style={{ marginTop: 20, marginBottom: 10 }}
            title="Confirm Password"
            isSecure={true}
            placeholderText="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#FCA048",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            elevation: 1,
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => {
            if (validate()) {
              signUp(userName, password);
            }
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 18,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SignUp;
