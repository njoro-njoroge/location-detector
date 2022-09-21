/** @format */

import React, { useState, useEffect } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import styles from "../../styles/Styles";
import { getAllPolygonsCoords } from "../../Apis/ClientApis";

import Colors from "../../config/Colors";
function ViewAllPolygons(props) {
  const [isLoading, setLoading] = useState(true);
  const [getCoords, setCoords] = useState([]);

  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);

  const [test, setTest] = useState([
    {
      name: "1",
      latitude: 0.083412312309351,
      longitude: 37.650158889592,
    },
    {
      name: "2",
      latitude: 0.08313839200302,
      longitude: 37.649973146617,
    },
    {
      name: "3",
      latitude: 0.083253726869077,
      longitude: 37.64982227236,
    },
    {
      name: "4",
      latitude: 0.083465621156992,
      longitude: 37.650048919022,
    },
  ]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    polyCords();
  }, []);
  const polyCords = () => {
    getAllPolygonsCoords({}).then((result) => {
      console.log("RESULTS DATA ", result.data.details);
      if (result.status == 200) {
        const getData = result.data.details;
        setLoading(false);

        setCoords(getData);
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

      const getCoordinates = async () => {
        try {
          let location = await Location.getCurrentPositionAsync();
          setLocation(location);
          const lat = JSON.stringify(location.coords.latitude);
          const long = JSON.stringify(location.coords.longitude);
          setCurrentLatitude(parseFloat(lat));
          setCurrentLongitude(parseFloat(long));
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
      {isLoading == true ? (
        <Text style={{ color: "#fff" }}>Loading...</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={"hybrid"}
            initialRegion={{
              latitude: 0.083412312309351,
              longitude: 37.650158889592,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            {getCoords.map((item, key) => {
              const latlng = item.coords.map((value) => ({
                latitude: parseFloat(value.latitude),
                longitude: parseFloat(value.longitude),
              }));

              return (
                <Polygon
                  key={key}
                  coordinates={latlng}
                  fillcolor={"rgba(100,200,200)"}
                  strokeColor="#FFD700"
                  strokeWidth={3}
                />
              );
            })}
          </MapView>
        </>
      )}
    </View>
  );
}

export default ViewAllPolygons;
