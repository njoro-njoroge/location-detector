/** @format */

import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
// import SinglePolygonScreen from "../screens/SinglePolygonScreen";
import { ToastAndroid } from "react-native";
import Colors from "../../config/Colors";
import UserScreen from "../screens/UserScreen";
// import AddPolygon from "../screens/AddPolygon";
import ManualPolygons from "../screens/ManualPolygons";
// import ViewPolygonsScreen from "../screens/ViewPolygonsScreen";
import Showpolygon from "../screens/Showpolygon";
import ViewAllPolygons from "../screens/ViewAllPolygons";
import PolygonScreen from "../screens/PolygonScreen";
const Stack = createNativeStackNavigator();

// function Root() {
//   return (
//     <Stack.Navigator>
//       {/* <Drawer.Screen name="Home" component={Home} /> */}
//       <Stack.Screen name="Manual" component={ManualPolygons} />
//     </Stack.Navigator>
//   );
// }

function CustomDrawerContent(props) {
  async function clearData() {
    try {
      await AsyncStorage.clear();

      await AsyncStorage.removeItem("userData");
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
      <DrawerItem
        label="Logout"
        options={{
          backgroundColor: "#fff",
        }}
        onPress={clearData}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();
const NavigationDrawer = () => {
  return (
    // <NavigationContainer>

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.primary,
        },
        drawerInactiveTintColor: "#ffff",
        drawerActiveTintColor: Colors.colorWhite,
        // drawerActiveBackgroundColor: "red",
      }}
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
        name="Add polygon"
        component={ManualPolygons}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Drawer.Screen
        name="Users"
        component={UserScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />

      <Drawer.Screen
        name="Polygons"
        component={PolygonScreen}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />

      <Drawer.Screen
        name="Show polygon"
        component={Showpolygon}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#5D63F5",
          },
        }}
      />
      <Drawer.Screen
        name="Get All Polygon"
        component={ViewAllPolygons}
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
      {/* <Drawer.Screen name="Root" component={Root} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default NavigationDrawer;
