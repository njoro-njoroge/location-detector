/** @format */
import React, { createContext, useState, useCallback, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import DawerScreen from "../screens/DawerScreen";
const Stack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();
const AuthNavigator = () => {
  const [auth, setAuthState] = useState(null);
  const [sceneName, setSceneName] = useState();

  // const getAuth = async () => {
  async function getAuth() {
    try {
      let value = await AsyncStorage.getItem("user");
      if (value != null) {
        setAuthState(true);
        setSceneName("Drawer");
        alert(value);
        navigation.replace("Home");
        return;
      } else {
        setSceneName("Home");
        alert(value);
      }
    } catch (e) {
      console.log("Failed to fetch the data from storage");
    }
  }
  useEffect(() => {
    getAuth;
  });
  // useEffect(() => {
  //   getAuth();
  // }, []);

  return (
    <NavigationContainer initialRouteName={sceneName}>
      {/* <Stack.Navigator initialRouteName={auth != null ? "Home" : "Drawer"}> */}
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
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Location detector",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#5D63F5",
            },
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Location detector",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#5D63F5",
            },
          }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
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
          component={DawerScreen}
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
    </NavigationContainer>
  );
};
export default AuthNavigator;
