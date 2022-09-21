/** @format */

import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Keyboard } from "react-native";

import AppButton from "../forms/AppButton";
import AppTextInput from "../forms/AppTextInput";
import { clientUpdate } from "../../Apis/ClientApis";
import styles from "../../styles/Styles";
import { ActivityIndicator } from "react-native-paper";

function UpdateProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userData");
      const currentUser = JSON.parse(savedUser);
      // setUserID(currentUser.userID);
      // setFirstName(currentUser.firstName);
      // setLastName(currentUser.lastName);
      // setUserName(currentUser.username);
      setUserID(currentUser[0]);
      setFirstName(currentUser[1]);
      setLastName(currentUser[2]);
      setUserName(currentUser[3]);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (firstName.length == 0 || lastName.length == 0 || username.length == 0) {
      alert("All feilds are required!");
      setIsLoading(false);
      return;
    }
    clientUpdate({
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      username: username,
    })
      .then((result) => {
        if (result.status == 200) {
          console.log(result.data);
          if (result.data.Message == true) {
            setIsLoading(false);
            alert(result.data.detail);
            // const editUser = [
            //   userID.userID,
            //   firstName.firstName,
            //   lastName.lastName,
            //   username.username,
            // ];
            const newUpdate = [userID, firstName, lastName, username];
            console.log("NEW UPDATE ", newUpdate);
            const storeUser = async () => {
              try {
                await AsyncStorage.setItem(
                  "userData",
                  JSON.stringify(newUpdate)
                );
                const savedUser = await AsyncStorage.getItem("userData");
                const currentUser = JSON.parse(savedUser);

                alert("Updated successfully ");
              } catch (error) {
                alert("ERROR ", currentUser);
                console.log(error);
              }
            };
            storeUser();
            navigation.navigate("Profile");
          } else {
            alert(result.data.detail);
            setIsLoading(false);
          }
        } else {
          alert(result.data.detail);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

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
      {isLoading === false ? (
        <AppButton title="Update" onPress={handleUpdate}></AppButton>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
export default UpdateProfileScreen;
