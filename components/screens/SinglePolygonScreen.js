/** @format */

import React, { Component } from "react";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import MapView, {
  Callout,
  Circle,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import styles from "../../styles/Styles";
import Colors from "../../config/Colors";

export default class SinglePolygonScreen extends Component {
  state = {
    coordinates: [
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
    ],
  };

  render() {
    console.log(this.state.coordinates);
    return (
      <View styles={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={"hybrid"}
          region={{
            latitude: 0.083465621156992,
            longitude: 37.650048919022,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Polygon
            coordinates={this.state.coordinates}
            fillcolor={"rgba(100,200,200)"}
            strokeColor="rgba(0, 0,0, 1)"
            strokeWidth={3}
          />
          {/* {this.state.coordinates.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            ></Marker>
          ))} */}

          {/* <Marker
            coordinate={{
              latitude: 0.083465621156992,
              longitude: 37.650048919022,
            }}
          ></Marker> */}
        </MapView>
      </View>
    );
  }
}

// export default SinglePolygonScreen;
