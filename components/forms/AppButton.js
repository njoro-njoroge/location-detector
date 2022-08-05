/** @format */

import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../../styles/Styles";
function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.blockButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;
