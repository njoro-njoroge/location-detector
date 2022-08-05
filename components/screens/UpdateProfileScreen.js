/** @format */

import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/Styles";
import { View, Text } from "react-native";

import AppButton from "../forms/AppButton";
import AppTextInput from "../forms/AppTextInput";

function UpdateProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      setUserID(currentUser[0]);
      setFirstName(currentUser[1]);
      setLastName(currentUser[2]);
      setUserName(currentUser[3]);
      // console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const UpdateUser = async () => {
      if (
        firstName.length == 0 ||
        lastName.length == 0 ||
        username.length == 0
      ) {
        alert("All feilds are required!");
        setIsSubmit(false);
        return;
      }
      const UpdateURL =
        "http://192.168.90.225/react_native/location_detector/update_profile.php";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const Data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        userID: userID,
      };
      fetch(UpdateURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          alert(response[0].Message);
          setIsSubmit(false);

          const newUpdate = [userID, firstName, lastName, username];

          const storeUser = async () => {
            try {
              await AsyncStorage.setItem("user", JSON.stringify(newUpdate));
              getUser();
            } catch (error) {
              console.log(error);
            }
          };

          storeUser();
          getUser();
          navigation.navigate("Profile");
        })
        .catch((error) => {
          alert("ERROR!! " + error);
          setIsSubmit(false);
          console.log("ERROR", error);
        });
    };
    if (isSubmit) UpdateUser();
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="map-marker"
        size={100}
        color="#F59B15"
        style={styles.headerIcon}
      />
      <Text style={styles.headertext}>Update profile</Text>

      <AppTextInput
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <AppTextInput
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <AppTextInput
        placeholder="Username"
        value={username}
        onChangeText={setUserName}
      />

      <AppButton title={"Update"} onPress={() => setIsSubmit(true)} />
    </View>
  );
}
export default UpdateProfileScreen;
