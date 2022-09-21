/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import styles from "../../styles/Styles";
import Colors from "../../config/Colors";
import {
  addNewPolygon,
  markPolygonDone,
  submitCoords,
} from "../../Apis/ClientApis";

function ManualPolygons(props) {
  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [userID, setUserID] = useState(null);
  const [polygonID, setPolygonID] = useState();
  const [newpolygon, setNewPolygon] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [pin, setPin] = useState({
    latitude: -4.04374,
    longitude: 39.658871,
  });

  useFocusEffect(
    useCallback(() => {
      checkPolygon();
      getUser();
    })
  );
  // GET USER ID
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userData");
      const currentUser = JSON.parse(savedUser);
      setUserID(currentUser[0]);
      console.log("CURRENT USER IS ", currentUser[0]);
    } catch (error) {
      console.log("CURRENT USER", error);
    }
  };
  // CHECK IF THERE IS A POLYGON
  const checkPolygon = async () => {
    try {
      const polygon = await AsyncStorage.getItem("poly");
      if (polygon != null) {
        const polygonID = JSON.parse(polygon);
        setPolygonID(polygonID);
        console.log("POLYGON ID IS ", polygonID);
        setNewPolygon(true);
      } else {
        console.log("NO POLYGON");
        // alert("Click on the button below to create a  polygon");
        setNewPolygon(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // CREATE A NEW POLYGON
  const handleNewPolygon = () => {
    setIsloading(true);
    addNewPolygon({
      userID: userID,
    })
      .then((result) => {
        console.log("RESULTS FROM SERVER ", result.data);
        if (result.status == 200) {
          if (result.data.status == true) {
            alert(result.data.message);
            setIsloading(false);
            const polygonID = result.data.polygonID;
            console.log("CREATED POLYGON ID ", polygonID);
            setPolygonID(polygonID);
            setNewPolygon(true);
            // insert polygon ID in asyncStorage
            const storePolygon = async () => {
              try {
                await AsyncStorage.setItem("poly", JSON.stringify(polygonID));
                const value = await AsyncStorage.getItem("poly");
              } catch (error) {
                console.log(error);
              }
            };
            setNewPolygon(true);
            storePolygon();
          } else {
            alert(result.data.message);
            setIsloading(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setIsloading(true);
      });
  };
  //SUBMIT COORDINATES
  const handleSubmitCords = () => {
    setIsloading(true);

    submitCoords({
      polygonID: polygonID,
      latitude: currentLatitude,
      longitude: currentLongitude,
    }).then((result) => {
      console.log("RESULTS FROM SERVER ", result.data);
      if (result.status == 200) {
        if (result.data.status == true) {
          setIsloading(false);
          alert(result.data.message);
        } else {
          alert(result.data.message);
          setIsloading(false);
        }
      } else {
        alert(result.data.message);
        setIsloading(false);
      }
    });
  };
  const handleDone = () => {
    setIsloading(true);
    markPolygonDone({
      polygonID: polygonID,
    }).then((result) => {
      console.log("RESULT FROM SERVER DONE", result.data);
      if (result.status == 200) {
        if (result.data.status == true) {
          setIsloading(false);
          alert(result.data.message);

          // creat polygon stored in asyncStorage
          const removeData = async () => {
            await AsyncStorage.removeItem("poly");
          };
          removeData();
        } else {
          setIsloading(false);
          alert(result.data.message);
        }
      }
    });
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

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

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            mapType={"hybrid"}
          >
            <Marker
              coordinate={pin}
              description="Current location"
              draggable={true}
              onDragStart={(e) => {
                console.log("DRAG START ", e.nativeEvent.coordinate);
              }}
              onDragEnd={(e) => {
                console.log("DRAG END ", e.nativeEvent.coordinate);
                setCurrentLatitude(e.nativeEvent.coordinate.latitude);
                setCurrentLongitude(e.nativeEvent.coordinate.longitude);
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }}
            ></Marker>
            <Circle
              center={pin}
              radius={10}
              strokeWidth={2}
              // strokeColor={"#000"}
            />
          </MapView>
          <View style={stylesButton.viewBottom}>
            <Text style={stylesButton.coordText}>
              Latitude: {currentLatitude}
            </Text>
            <Text style={stylesButton.coordText}>
              Longitude:{currentLongitude}
            </Text>
            {newpolygon == true ? (
              <>
                <TouchableOpacity
                  style={stylesButton.blockButton}
                  onPress={handleSubmitCords}
                >
                  <Text style={stylesButton.btnText}>Submit coordinates</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={stylesButton.blockButton}
                  onPress={handleDone}
                >
                  <Text style={stylesButton.btnText}>Done</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={stylesButton.blockButton}
                onPress={handleNewPolygon}
              >
                <Text style={stylesButton.btnText}>Add a polygon</Text>
              </TouchableOpacity>
            )}
          </View>
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
    flex: 1,
    margin: 5,
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
export default ManualPolygons;
