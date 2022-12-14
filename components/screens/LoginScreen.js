/** @format */

import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Keyboard, ActivityIndicator } from "react-native";

import styles from "../../styles/Styles";
import AppButton from "../forms/AppButton";
import AppTextInput from "../forms/AppTextInput";
import { clientLogin } from "../../Apis/ClientApis";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      if (state.isConnected === true) {
        console.log("Connected to ", state.type);
      } else {
        alert("No internet connection");
      }
    });

    unsubscribe();
  });

  const handleLogin = () => {
    Keyboard.dismiss();
    setIsloading(true);
    if (username.length == 0 || password.length == 0) {
      alert("Enter username and password");
      setIsloading(false);
      return;
    }
    clientLogin({
      username: username,
      password: password,
    })
      .then((result) => {
        console.log("RESULTS FROM SERVER ", result.data);
        if (result.status == 200) {
          if (result.data.Message == true) {
            setIsloading(false);
            const user = result.data;

            const logUser = [
              user.userID,
              user.firstName,
              user.lastName,
              user.username,
            ];

            const storeUser = async () => {
              try {
                await AsyncStorage.setItem("userData", JSON.stringify(logUser));
                const values = await AsyncStorage.getItem("userData");
                const person = JSON.parse(values);
                console.log("THIS PERSON ", person);
                navigation.navigate("Drawer");
              } catch (error) {
                console.log(error);
                setIsloading(false);
              }
            };
            storeUser();
          } else {
            alert(result.data.detail);
            setIsloading(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setIsloading(false);
      });
  };

  // useEffect(() => {
  //   const LoginUser = async () => {
  //     Keyboard.dismiss();
  //     setIsloading(true);
  //     if (username.length == 0 || password.length == 0) {
  //       alert("Enter username and password");
  //       setIsSubmit(false);
  //       setIsloading(false);
  //       return;
  //     }

  //     // const LoginURL = apis.loginUser;
  //     const LoginURL =
  //       "http://192.168.0.105/react_native/location_detector/login.php";
  //     const headers = {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     };
  //     const Data = {
  //       username: username,
  //       password: password,
  //     };
  //     fetch(LoginURL, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(Data),
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         console.log(response);

  //         if (response.Message == "true") {
  //           const LogUser = [
  //             response.userID,
  //             response.firstName,
  //             response.lastName,
  //             response.username,
  //           ];

  //           const storeUser = async () => {
  //             try {
  //               await AsyncStorage.setItem("user", JSON.stringify(LogUser));
  //             } catch (error) {
  //               console.log(error);
  //             }
  //           };

  //           storeUser();

  //           ToastAndroid.show("Login successfully!", ToastAndroid.LONG);
  //           setIsSubmit(false);
  //           setIsloading(false);
  //           navigation.replace("Login");
  //           navigation.navigate("Drawer");
  //         } else {
  //           alert("Failed to login. Please confirm username and password");
  //           setIsSubmit(false);
  //           setIsloading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         alert("ERROR!! " + error);
  //         setIsSubmit(false);
  //         setIsloading(false);
  //         console.log("ERROR", error);
  //       });
  //   };
  //   if (isSubmit) LoginUser();
  // }, [isSubmit]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="map-marker"
        size={100}
        color="#F59B15"
        style={styles.headerIcon}
      />
      <Text style={styles.headertext}>Login</Text>

      <AppTextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <AppTextInput
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      {isloading === false ? (
        <AppButton title="Login" onPress={handleLogin}></AppButton>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default LoginScreen;
