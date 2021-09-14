import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputTextField = ({
  style,
  title,
  placeholderText,
  isSecure,
  value,
  onChangeText,
}) => {
  const [hidePass, setHidePass] = React.useState(isSecure);
  const [showIcon, setShowIcon] = React.useState(false);

  return (
    <View style={style}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={placeholderText}
          secureTextEntry={hidePass}
          style={[styles.input, { flex: 9 }]}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
            setShowIcon(isSecure && text.length !== 0);
          }}
        />
        {showIcon && (
          <Icon
            style={{ flex: 1, alignSelf: "center", textAlign: "center" }}
            name={hidePass ? "eye-slash" : "eye"}
            size={16}
            color="#616161"
            onPress={() => setHidePass(!hidePass)}
          />
        )}
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 16,
    color: "#616161",
  },
  input: {
    paddingVertical: 8,
    color: "#1D2029",
    fontSize: 14,
  },
});

export default InputTextField;
