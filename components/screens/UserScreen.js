/** @format */

import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { getAllUsers } from "../../Apis/ClientApis";

// import styles from "../../styles/Styles";
function UserScreen(props) {
  const [getData, setGetData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    getAllUsers({}).then((result) => {
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

  // const renderItem = (itemData) => {
  //   return (
  //     <View style={styles.containerFlate}>
  //       <View style={styles.innerContainer}>
  //         <Text style={styles.title}>Id : {itemData.item.userID}</Text>

  //         {/* <Text style={styles.title}>Name : {itemData.item.name}</Text> */}

  //         <Text style={styles.title}>Email : {itemData.item.username}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.constainer}>
      {/* <Text>Name :{getData.name} gone</Text> */}
      <FlatList
        data={getData}
        keyExtractor={(id, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      {/* <FlatList
        data={getData}
        renderItem={renderItem}
        keyExtractor={(item) => item.userID}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: "#c91111",
    flex: 1,
    marginTop: 0,
  },
  containerFlate: {
    flex: 1,
    margin: 1,
    height: 0,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: "#c91111",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    marginTop: 400,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
export default UserScreen;
