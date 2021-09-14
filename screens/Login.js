import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InputTextField from "../components/InputTextField";
import { AuthContext } from "../context";
import Container from "./Container";

const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validate = () => {
    if (userName.trim() === "" || password.trim() === "") {
      alert("Username or password cannot be empty");
      return false;
    }
    return true;
  };
  return (
    <Container>
      <View style={{ width: 300 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 80,
            alignSelf: "center",
          }}
        >
          Flappy Bird
        </Text>

        <InputTextField
          title="User Name"
          placeholderText="User name"
          value={userName}
          onChangeText={setUserName}
        />
        <InputTextField
          style={{ marginTop: 30, marginBottom: 5 }}
          title="Password"
          isSecure={true}
          placeholderText="Password"
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={{ marginVertical: 10, color: "#2E94DF", textAlign: "right" }}
        >
          Forgot Password?
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#2E94DF",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            elevation: 1,
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => {
            if (validate()) {
              signIn(userName.trim(), password.trim());
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
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#ABB4BD",
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#2E94DF", fontSize: 13, fontWeight: "600" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
