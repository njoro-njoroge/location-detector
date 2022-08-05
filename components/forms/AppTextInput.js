/** @format */

import React from "react";
import { TextInput } from "react-native";

import styles from "../../styles/Styles";
function AppTextInput({icon,...otherProps}) {
  return <TextInput style={styles.textInput} {...otherProps} />;
}

export default AppTextInput;
