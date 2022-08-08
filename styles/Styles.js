/** @format */
import { StyleSheet, Dimensions } from "react-native";

import colors from "../config/Colors";

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginTop: 60,
    alignItems: "center",
  },
  headertext: {
    color: colors.colorWhite,
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
  },
  textInput: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.colorWhite,
    fontWeight: "bold",
  },
  blockButton: {
    width: "80%",
    height: 50,
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.btnColor,
    elevation: 2,
    padding: 10,
    marginLeft: 75,
    marginRight: 75,
    marginTop: 25,
    borderRadius: 45,
  },
  buttonText: {
    color: colors.colorWhite,
    fontWeight: "bold",
    fontSize: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    color: colors.colorWhite,
  },
  profile: {
    padding: 30,
  },
  card: {
    backgroundColor: colors.colorWhite,
  },
  navDrawer: {
    backgroundColor: colors.primary,
    color: colors.colorWhite,
  },
});
export default styles;
