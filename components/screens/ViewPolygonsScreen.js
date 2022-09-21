/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

// import styles from "../../styles/Styles";
// import colors from "../config/Colors";
import colors from "../../config/Colors";
import { getAllPolygons } from "../../Apis/ClientApis";

function ViewPolygonsScreen(props) {
  const [getData, setGetData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    getAllPolygons({}).then((result) => {
      console.log("RESULTS DATA", result.data.details);

      if (result.status == 200) {
        if (result.data.status == true) {
          const getData = result.data.details;
          setGetData(getData);

          // console.log("DATA FROM DB " + result.data);
        } else {
          console.log(result.data.message);
        }
      } else {
        // error
      }
    });
  };
  // const Item = ({ polygonID }) => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={{ color: "black" }}>{polygonID}</Text>
  //     </View>
  //   );
  // };
  // const renderItem = ({ item }) => <Item name={item.id} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        styles={styles.container}
        data={getData}
        keyExtractor={(id, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>Polygon {item.polygonID}</Text>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: colors.btnColor,
    padding: 20,
    marginVertical: 4,
    backgroundColor: colors.colorWhite,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 25,
  },
});

export default ViewPolygonsScreen;
