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
  FlatList,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/Styles";
import { getAllPolygons, getPolygonCoords } from "../../Apis/ClientApis";

import Colors from "../../config/Colors";
function ViewAllPolygons(props) {
  const [isLoading, setLoading] = useState(true);
  const [object, setObject] = useState(0);
  const [getCoords, setCoords] = useState([]);

  const [locationStatus, setLocationStatus] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [pin, setPin] = useState({
    latitude: -4.04374,
    longitude: 39.658871,
  });
  // const athletes = [
  //   {
  //     athlete_id: 123,
  //     first_name: "john",
  //     last_name: "doe",
  //     teams: [
  //       { team_id: 4, team_name: "Eagles" },
  //       { team_id: 7, team_name: "Knights" },
  //     ],
  //   },
  //   {
  //     athlete_id: 276,
  //     first_name: "jane",
  //     last_name: "doe",
  //     teams: [
  //       { team_id: 4, team_name: "Pilots" },
  //       { team_id: 7, team_name: "Thunder" },
  //     ],
  //   },
  // ];
  // console.log(athletes);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    polyCords();
  }, []);
  const polyCords = () => {
    getAllPolygons({}).then((result) => {
      console.log("RESULTS DATA ", result.data.details);
      if (result.status == 200) {
        // if (result.data.status == true) {
        const getData = result.data.details;
        setLoading(false);
        // const res = getData.map((value) => ({
        //   latitude: parseFloat(value.latitude),
        //   longitude: parseFloat(value.longitude),
        // }));
        // console.log("COORDS ", res);

        // const data = getData.coords.map((entry) =>
        //   Object.entries(entry).reduce(
        //     (obj, [key, value]) => ((obj[key] = parseFloat(value)), obj),
        //     {}
        //   )
        // );
        // console.log("COORDS 2", data);
        setCoords(getData);
        console.log("NESTED ", getCoords);
        // const newFs = getData.map((key2) =>
        //   Object.fromEntries(
        //     Object.entries(key2).map(([key, val]) => [
        //       key,
        //       typeof val === "string" ? parseFloat(val) : val,
        //     ])
        //   )
        // );
        // console.log(newFs);

        // const user = {
        //   id: 101,
        //   email: "jack@dev.com",
        //   personalInfo: {
        //     name: "Jack",
        //     address: {
        //       line1: "westwish st",
        //       line2: "washmasher",
        //       city: "wallas",
        //       state: "WX",
        //     },
        //   },
        // };
        // console.log(user.personalInfo.address);
        // } else {
        //   console.log(result.data.message);
        // }
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
    <View style={styles.container}>
      {isLoading == true ? (
        <Text style={{ color: "#fff" }}>Loading...</Text>
      ) : (
        <>
          {/* <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={"hybrid"}
            initialRegion={{
              latitude: 0.083412312309351,
              longitude: 37.650158889592,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }} */}
          {/* // data={getCoords}
            // renderItem={({ item }) => <Marker coordinate={item}></Marker>}
          // > */}
          {/* {getCoords.map((marker, index) => (
              <Marker
                key={index}
                coordinates={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}

                // title={marker.name}
              ></Marker>
            ))} */}
          {/* <Polygon
              coordinates={getCoords}
              fillcolor={"rgba(100,200,200)"}
              strokeColor="rgba(0, 0,0, 1)"
              strokeWidth={3}
            /> */}
          {/* </MapView> */}
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
              // return (
              // <View key={key}>
              //   <Text>{item.polygonID}</Text>
              // {item.coords.map((unit, key2) => {
              // const polygon = unit.map((coordsArr) => {
              //   let coords = {
              //     latitude: coordsArr[1],
              //     longitude: coordsArr[0],
              //   };
              //   return coords;
              // });
              // return (
              const res = item.coords.map((value) => ({
                latitude: parseFloat(value.latitude),
                longitude: parseFloat(value.longitude),
              }));
              <Polygon
                key={key}
                coordinates={(item.coords.latitude, item.coords.longitude)}
                strokeColor="#FFD700"
                strokeWidth={3}
              />;

              // <Polygon
              //   key={key2}
              //   coordinates={polygon}
              //   fillcolor={"rgba(100,200,200)"}
              //   strokeColor="rgba(0, 0,0, 1)"
              //   strokeWidth={3}
              // ></Polygon>
              // <Text key={key2}>
              //   {unit.latitude} {unit.longitude}
              // </Text>
              // );
              // })}
              {
                /* </View> */
              }
              // );
            })}
            {/* {getCoords.coords.map(item, (key) => {
              <Polygon
                coordinates={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                fillcolor={"rgba(100,200,200)"}
                strokeColor="rgba(0, 0,0, 1)"
                strokeWidth={3}
              ></Polygon>;
            })} */}
          </MapView>
          {/* {getCoords.map((item, key) => {
            return (
              <View key={key}>
                <Text>{item.polygonID}</Text>
                {item.coords.map((unit, key2) => {
                  return (
                    <Text key={key2}>
                      {unit.latitude} {unit.longitude}
                    </Text>
                  );
                })}
              </View>
            );
          })} */}
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

export default ViewAllPolygons;
