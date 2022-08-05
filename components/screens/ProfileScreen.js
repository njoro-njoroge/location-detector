/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function ProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  useFocusEffect(
    useCallback(() => {
      getUser();
    })
  );

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      if (currentUser !== null || currentUser !== undefined) {
        // console.log("Fetched update ", currentUser);
        setFirstName(currentUser[1]);
        setLastName(currentUser[2]);
        setUserName(currentUser[3]);
        // setUserData(true);
      } else {
        // setUserData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.profile}>
            <Text style={styles.text}>{firstName + " " + lastName}</Text>
            <Text style={styles.text}>Username: {username}</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#5D63F5",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    color: "#ffff",
  },
  profile: {
    padding: 30,
  },
  card: {
    backgroundColor: "5D63F5",
  },
});
export default ProfileScreen;
