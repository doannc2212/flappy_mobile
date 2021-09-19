import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
        <Image
          style={{ marginBottom: 80, alignSelf: "center" }}
          source={require("../assets/images/flappybird-logo.png")}
        />

        <View style={{ marginHorizontal: 5 }}>
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
        </View>

        <Text
          style={{ marginVertical: 10, color: "#FCA048", textAlign: "right" }}
        >
          Forgot Password?
        </Text>

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
            <Text style={{ color: "#FCA048", fontSize: 13, fontWeight: "600" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
