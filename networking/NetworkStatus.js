/** @format */

import React, { Component, useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Linking } from "react-native";
import NetInfo from "@react-native-community/netinfo";

function NetworkStatus(netAccess) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected === true) {
        alert("connected");
        setConnected(state.isConnected);

        NetInfo.fetch().then((networkState) => {
          console.log("Connection type - ", networkState.type);
          console.log("Is connected? - ", networkState.isConnected);
        });
      } else {
        alert("No internet connection");
      }
    });

    // Unsubscribe
    unsubscribe();
  });
  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default NetworkStatus;
