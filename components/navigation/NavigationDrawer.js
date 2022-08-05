/** @format */

import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { ToastAndroid } from "react-native";

function CustomDrawerContent(props) {
  async function clearData() {
    try {
      await AsyncStorage.clear();

      // await AsyncStorage.removeItem("keyc");
      ToastAndroid.show("Successfully logged out!", ToastAndroid.SHORT);
      props.navigation.navigate("Home");
      return true;
    } catch (e) {
      // clear error
      console.log(e);
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={clearData} />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();
const NavigationDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Location",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Drawer.Screen
        name="Update profile"
        component={UpdateProfileScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;
