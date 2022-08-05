/** @format */

import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import styles from "../../styles/Styles";
import AppButton from "../forms/AppButton";
import AppTextInput from "../forms/AppTextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let context = this;
    try {
      let value = await AsyncStorage.getItem("user");
      if (value != null) {
        navigation.navigate("Drawer");
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  useEffect(() => {
    const RegisterUser = async () => {
      if (
        firstName.length == 0 ||
        lastName.length == 0 ||
        username.length == 0 ||
        password.length == 0
      ) {
        alert("All feilds are required!");
        setIsSubmit(false);
        return;
      }
      const RegisterURL =
        "http://192.168.90.225/react_native/location_detector/register.php";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const Data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      };
      fetch(RegisterURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          if (response.Message == "true") {
            alert("Registered successfully");
            setIsSubmit(false);
            navigation.navigate("Login");
            return;
          }
          if (response.Message == "exist") {
            alert("Username already taken");
            setIsSubmit(false);
            return;
          }
          if (response.Message == "false") {
            alert("Failed to register");
            setIsSubmit(false);
            navigation.navigate("Login");
            return;
          }
        })
        .catch((error) => {
          alert("ERROR!! " + error);
          setIsSubmit(false);
          console.log("ERROR", error);
        });
    };
    if (isSubmit) RegisterUser();
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="map-marker"
        size={100}
        color="#F59B15"
        style={styles.headerIcon}
      />
      <Text style={styles.headertext}>Register</Text>
      <AppTextInput
        placeholder="First name"
        onChangeText={(text) => setFirstName(text)}
      />
      <AppTextInput
        placeholder="Last name"
        onChangeText={(text) => setLastName(text)}
      />
      <AppTextInput
        placeholder="Username"
        onChangeText={(text) => setUserName(text)}
      />

      <AppTextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <AppButton
        title={"Register"}
        onPress={() => setIsSubmit(true)}
      ></AppButton>
    </View>
  );
}

export default RegisterScreen;
