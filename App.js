/** @format */
import React, { useEffect, useState } from "react";

import AuthNavigator from "./components/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import DrawerScreen from "./components/screens/DrawerScreen";
import SplashScreen from "./components/screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

import styles from "./styles/Styles";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const handleGetUser = async () => {
    try {
      const checkLogin = await AsyncStorage.getItem("userData");
      if (checkLogin != null) {
        setIsLogin(true);
        setIsLoading(false);
        console.log(isLogin);
      } else {
        isLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGetUser();
  });

  // if (isLoading == false) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }
  return (
    <NavigationContainer>
      {/* {isLoading !== true ? (
        <>
          <View style={styles.container}>
            <ActivityIndicator style={{ flex: 1 }} />
          </View>
        </> */}
      {/* ) : ( */}
      <>{isLogin == false ? <AuthNavigator /> : <DrawerScreen />}</>
      {/* )} */}
    </NavigationContainer>
  );
}
