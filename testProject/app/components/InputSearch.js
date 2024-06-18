import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { colors } from "../constants";

const InputSearch = (props) => {
  const { placeholder, value, onChange, onClear } = props;

  return (
    <View style={styles.container}>
      <Feather
        onPress={() => setIsOpen(!isOpen)}
        name={"search"}
        size={20}
        style={styles.searchIcon}
        color={colors.gray}
      />
      <TextInput
        value={value}
        placeholder={placeholder}
        style={styles.inputStyle}
        onChangeText={(input) => onChange(input)}
        placeholderTextColor={colors.gray}
      />
      {value && (
        <Ionicons
          onPress={onClear}
          name={"close-circle-outline"}
          size={20}
          style={styles.clearIcon}
          color={colors.gray}
        />
      )}
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    paddingLeft: 35,
    color: colors.white,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  clearIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
