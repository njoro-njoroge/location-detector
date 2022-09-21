/** @format */

import React, { useState, useEffect } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/Styles";
import { shinglePolygon } from "../../Apis/ClientApis";

import Colors from "../../config/Colors";
function Showpolygon({ route }) {
  const { polygonID } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [object, setObject] = useState(0);
  const [getCoords, setCoords] = useState([]);
  // {
  //   name: "1",
  //   latitude: 0.083412312309351,
  //   longitude: 37.650158889592,
  // },
  // {
  //   name: "2",
  //   latitude: 0.08313839200302,
  //   longitude: 37.649973146617,
  // },
  // {
  //   name: "3",
  //   latitude: 0.083253726869077,
  //   longitude: 37.64982227236,
  // },
  // {
  //   name: "4",
  //   latitude: 0.083465621156992,
  //   longitude: 37.650048919022,
  // },
  // console.log(getCoords);
  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [pin, setPin] = useState({
    latitude: -4.04374,
    longitude: 39.658871,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 60; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  useEffect(() => {
    polyCords();
  }, []);
  const polyCords = () => {
    shinglePolygon({
      polygonID: polygonID,
    }).then((result) => {
      console.log("RESULTS DATA 4", result.data);

      if (result.status == 200) {
        if (result.data.status == true) {
          const getData = result.data.details;
          setLoading(false);
          const res = getData.map((value) => ({
            latitude: parseFloat(value.latitude),
            longitude: parseFloat(value.longitude),
          }));
          console.log(res);
          setCoords(res);
        } else {
          console.log(result.data.message);
        }
      } else {
        // error
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

      // Geolocation.getCurrentPositionAsync();

      const getCoordinates = async () => {
        try {
          let location = await Location.getCurrentPositionAsync();
          setLocation(location);
          const lat = JSON.stringify(location.coords.latitude);
          const long = JSON.stringify(location.coords.longitude);
          setCurrentLatitude(parseFloat(lat));
          setCurrentLongitude(parseFloat(long));
          //   setLocationStatus(true);
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading == true ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={"hybrid"}
            initialRegion={{
              latitude: 0.083407618448546,
              longitude: 37.649579532444,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            // data={getCoords}
            // renderItem={({ data }) => <Marker coordinates={data}></Marker>}
          >
            {getCoords.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              ></Marker>
            ))}
            <Polygon
              coordinates={getCoords}
              fillcolor={"rgba(100,200,200)"}
              strokeColor="#FFD700"
              strokeWidth={3}
            />
          </MapView>
          <View
            style={{
              backgroundColor: "#000",
              flex: 1,
              width: "100%",
              alignContent: "center",
              justifyContent: "center",
              marginLeft: 75,
              marginRight: 75,
              top: 0,
              position: "absolute",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
              Polygon {polygonID}
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
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

export default Showpolygon;
