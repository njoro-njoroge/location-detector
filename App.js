/** @format */
import React, { useState } from "react";

import AuthNavigator from "./components/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import DrawerScreen from "./components/screens/DrawerScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <NavigationContainer>
      {isLoading !== true ? <AuthNavigator /> : <DrawerScreen />}
    </NavigationContainer>
  );
}
