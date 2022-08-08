/** @format */

import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";

import styles from "../../styles/Styles";
import AppButton from "../forms/AppButton";
import AppTextInput from "../forms/AppTextInput";
import { clientRegister } from "../../Apis/ClientApis";

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

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
  const handleRegister = () => {
    Keyboard.dismiss();
    setIsloading(true);
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      username.length == 0 ||
      password.length == 0
    ) {
      alert("All feilds are required!");
      setIsloading(false);
      return;
    }
    clientRegister({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    })
      .then((result) => {
        if (result.status == 200) {
          if (result.data.Message == true) {
            setIsloading(false);
            alert(result.data.detail);
            navigation.navigate("Login");
          } else {
            alert(result.data.detail);
            setIsloading(false);
          }
        } else {
          alert(result.data.detail);
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsloading(false);
      });
  };

  // useEffect(() => {
  //   const RegisterUser = async () => {
  //     if (
  //       firstName.length == 0 ||
  //       lastName.length == 0 ||
  //       username.length == 0 ||
  //       password.length == 0
  //     ) {
  //       alert("All feilds are required!");
  //       setIsSubmit(false);
  //       return;
  //     }
  //     const RegisterURL =
  //       "http://192.168.0.105/react_native/location_detector/register.php";
  //     const headers = {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     };
  //     const Data = {
  //       firstName: firstName,
  //       lastName: lastName,
  //       username: username,
  //       password: password,
  //     };
  //     fetch(RegisterURL, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(Data),
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         // console.log(response);
  //         if (response.Message == "true") {
  //           alert("Registered successfully");
  //           setIsSubmit(false);
  //           navigation.navigate("Login");
  //           return;
  //         }
  //         if (response.Message == "exist") {
  //           alert("Username already taken");
  //           setIsSubmit(false);
  //           return;
  //         }
  //         if (response.Message == "false") {
  //           alert("Failed to register");
  //           setIsSubmit(false);
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         alert("ERROR!! " + error);
  //         setIsSubmit(false);
  //         console.log("ERROR", error);
  //       });
  //   };
  //   if (isSubmit) RegisterUser();
  // }, [isSubmit]);

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
      {isLoading === false ? (
        <AppButton title="Register" onPress={handleRegister}></AppButton>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default RegisterScreen;
