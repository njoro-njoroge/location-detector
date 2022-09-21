/** @format */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPolygons } from "../../Apis/ClientApis";
// import styles from "../../styles/Styles";
function PolygonScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState([]);

  useEffect(() => {
    polygons();
  }, []);
  const polygons = () => {
    getPolygons({}).then((result) => {
      console.log("RESPONSE FROM API ", result.data.details);
      if (result.status == 200) {
        if (result.data.message == true) {
          const data = result.data.details;
          console.log(data);
          setData(data);
        } else {
          alert(result.data.message);
        }
      } else {
        // console.log(result.data);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        Select a polygon to view coordinates
      </Text>
      <FlatList
        data={getData}
        // keyExtractor={(id, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text
              style={styles.item}
              key={item.polygonID}
              onPress={() => {
                // console.log(item.polygonID);
                navigation.navigate("Show polygon", {
                  polygonID: item.polygonID,
                  otherParam: "anything you want here",
                });
              }}
            >
              Polygon {item.polygonID.toString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D63F5",
  },
  headerText: {
    marginTop: 10,
    paddingBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#AEADA3",
    borderBottomColor: "#AEADA3",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#AEADA3",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 25,
    marginVertical: 0.5,
    marginHorizontal: 1,
    borderBottomColor: "#AEADA3",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default PolygonScreen;
