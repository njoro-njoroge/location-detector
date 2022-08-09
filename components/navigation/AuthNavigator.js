/** @format */
import React, { createContext, useState, useCallback, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DrawerScreen from "../screens/DrawerScreen";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [auth, setAuthState] = useState(null);
  const [sceneName, setSceneName] = useState();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Location detector",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Location detector",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Location detector",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{
          title: "Location detector",
          headerTintColor: "#fff",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
