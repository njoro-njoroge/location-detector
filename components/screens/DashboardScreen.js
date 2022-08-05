/** @format */

import React, { useState, useEffect } from "react";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View } from "react-native";
import * as Location from "expo-location";

import styles from "../../styles/Styles";
export default function DashboardScreen(props) {
  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [pin, setPin] = useState({
    latitude: -4.04374,
    longitude: 39.658871,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Geolocation.getCurrentPositionAsync();

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
      const lat = JSON.stringify(location.coords.latitude);
      const long = JSON.stringify(location.coords.longitude);
      setCurrentLatitude(parseFloat(lat));
      setCurrentLongitude(parseFloat(long));
      setLocationStatus(true);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

    // console.log(text);
  }

  return (
    <View style={styles.container}>
      {locationStatus === false ? (
        <Text>Loading...</Text>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          followsUserLocation={true}

          // showsUserLocation={true}
          //   setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //   });

          // onUserLocationChange={(e) => {
          //   console.log("Change loction", e.nativeEvent.coordinate);
          //   setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //   });
          // }}
        >
          <Marker
            coordinate={pin}
            description="Current location"
          ></Marker>
          {/* <Circle
            center={pin}
            radius={5}
            strokeWidth={2}
            strokeColor={"#887"}
          /> */}
        </MapView>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// map: {
//   width: Dimensions.get("window").width,
//   height: Dimensions.get("window").height,
//   },
// });
