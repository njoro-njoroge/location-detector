/** @format */
import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: "#5D63F5",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#5D63F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginTop: 60,
    alignItems: "center",
  },
  headertext: {
    color: "#ffff",
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
    backgroundColor: "#ffff",
    fontWeight: "bold",
  },
  blockButton: {
    width: "80%",
    height: 50,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F59B15",
    elevation: 2,
    padding: 10,
    marginLeft: 75,
    marginRight: 75,
    marginTop: 25,
    borderRadius: 45,
  },
  buttonText: {
    color: "#ffff",
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
    color: "#ffff",
  },
  profile: {
    padding: 30,
  },
  card: {
    backgroundColor: "5D63F5",
  },
  navDrawer: {
    backgroundColor: "5D63F5",
    color: "#ffff",
  },
});
export default styles;
