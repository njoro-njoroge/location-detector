/** @format */

import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/Styles";
import AppButton from "../forms/AppButton";

function HomeScreen({ navigation }) {
  const [userStatus, setUserStatus] = useState(false);
  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   let context = this;
  //   try {
  //     let value = await AsyncStorage.getItem("user");
  //     if (value != null) {
  //       navigation.navigate("Drawer");
  //       setUserStatus(true);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     alert(error);
  //   }
  // };
  return (
    <View style={styles.mainConatiner}>
      <MaterialCommunityIcons name="map-marker" size={200} color="#F59B15" />

      <AppButton title={"Login"} onPress={() => navigation.navigate("Login")} />

      <AppButton
        title={"Register"}
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

export default HomeScreen;
