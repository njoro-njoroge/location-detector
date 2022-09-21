/** @format */

import React, { useState, useEffect } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/Styles";
import { updateLocation } from "../../Apis/ClientApis";

import Colors from "../../config/Colors";

export default function DashboardScreen() {
  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [userID, setUserID] = useState(null);
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

      const getCoordinates = async () => {
        try {
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

          // get storeUser
          const getUser = async () => {
            try {
            } catch (error) {}
          };
          const savedUser = await AsyncStorage.getItem("userData");
          const currentUser = JSON.parse(savedUser);
          setUserID(currentUser[0]);
          console.log("CURRENT USER IS ", currentUser[0]);

          // const newUpdate = [currentUser[0], lat, long];
          // console.log("NEW UPDATE ", newUpdate);
          // Update location
          if (userID !== null || location !== undefined) {
            setUserID("USER ID ", currentUser[0]);
            updateLocation({
              userID: currentUser[0],
              latitude: lat,
              longitude: long,
            }).then((result) => {
              console.log("RESULTS FROM SERVER ", result.data);
              if (result.status == 200) {
                // alert(result.data.detail);
              } else {
                console.log("RESPONSE ", result.data.message);
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      getCoordinates();
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
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
            mapType={"hybrid"}
            showsUserLocation={true}
          >
            <Marker
              coordinate={pin}
              description="Current location"
              // draggable={true}
              // onDragStart={(e) => {
              //   console.log("DRAG START ", e.nativeEvent.coordinate);
              // }}
              // onDragEnd={(e) => {
              //   console.log("DRAG END ", e.nativeEvent.coordinate);
              //   setPin({
              //     // latitude: e.nativeEvent.coordinate.latitude,
              //     // longitude: e.nativeEvent.coordinate.longitude,

              //   });
              // }}
            ></Marker>
            <Circle
              center={pin}
              radius={10}
              strokeWidth={2}
              // strokeColor={"#000"}
            />
          </MapView>
          {/* <View style={stylesButton.viewBottom}>
            <Text style={stylesButton.coordText}>
              Latitude: {currentLatitude}
            </Text>
            <Text style={stylesButton.coordText}>
              Longitude:{currentLongitude}
            </Text>
            <TouchableOpacity
              title="Submit location"
              style={stylesButton.blockButton}
            >
              <Text style={stylesButton.btnText}>Submit</Text>
            </TouchableOpacity>
          </View> */}
        </>
      )}
    </View>
  );
}

const stylesButton = StyleSheet.create({
  buttonCallout: {
    textAlign: "center",
    color: "#000",
    position: "absolute",
    fontSize: 150,
  },
  btnText: {
    color: Colors.colorWhite,
    fontWeight: "bold",
    fontSize: 15,
    alignContent: "center",
    justifyContent: "center",
  },
  blockButton: {
    width: "80%",
    height: 40,
    alignItems: "center",
    backgroundColor: Colors.btnColor,
    alignItems: "center",
    elevation: 2,
    padding: 10,
    borderRadius: 45,
  },
  viewBottom: {
    backgroundColor: "#000",
    flex: 1,
    width: "100%",
    height: 100,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 75,
    marginRight: 75,
    bottom: 0,
    position: "absolute",
  },
  coordText: {
    color: Colors.colorWhite,
    marginLeft: 20,
  },
});
