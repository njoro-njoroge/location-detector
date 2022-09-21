/** @format */

import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import styles from "../../styles/Styles";
import AppButton from "../forms/AppButton";
import { addNewPolygon, clientLogin } from "../../Apis/ClientApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManualPolygons from "./ManualPolygons";
import { ScreenStack } from "react-native-screens";
import AuthNavigator from "../navigation/AuthNavigator";

function AddPolygon({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [boxID, setBoxID] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    getUser();
  });
  // get storeUser
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userData");
      const currentUser = JSON.parse(savedUser);
      setUserID(currentUser[0]);
      console.log("CURRENT USER IS ", currentUser[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    addNewPolygon({
      userID: userID,
    })
      .then((result) => {
        console.log("RESULTS FROM SERVER ", result.data);
        if (result.status == 200) {
          if (result.data.status == true) {
            alert(result.data.message);
            setIsLoading(false);
            // navigation.navigate(AuthNavigator, { screen: ManualPolygons });
          } else {
            alert(result.data.message);
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(true);
      });
  };

  const ReactNative = ScreenStack({
    mPolygon: { screen: ManualPolygons },
    // Chat: { screen: ChatScreen },
  });
  return (
    <View style={styles.container}>
      {isLoading === false ? (
        <AppButton title="New polygon" onPress={handleSubmit} />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

export default AddPolygon;
