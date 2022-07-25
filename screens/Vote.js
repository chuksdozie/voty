import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Updates from "expo-updates";
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import OptionTag from "../components/OptionTag";

// import { Text, View } from "../components/Themed";

export default function Home({ navigation }) {
  const onReloadPress = useCallback(() => {
    if (Platform.OS === "web") {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerSpacer}></View>
      <View style={styles.logo}>
        <Ionicons
          name="caret-back-circle-outline"
          color={"#6e7a6e"}
          size={30}
          onPress={() => navigation.goBack()}
        />
        {/* <Text style={styles.logoText}>Back</Text> */}
      </View>
      {/* <View style={styles.headerSpacer}>
        <Ionicons name="person-circle" color={"#86c0c6"} size={70} />
      </View> */}
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          {/* <Image source={}/> */}
          <Text style={styles.nameText}>Please enter your voting ID</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"Example: VXD-7w84d"}
            textAlign="center"
            selectionColor={"#6e7a6e"}
          />
          <Text style={styles.subText}>
            Please note that, you won't be allowed to vote twice.{"\n"} So be
            sure to vote only when you are ready.
          </Text>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#6e7a6e",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  headerSpacer: {
    display: "flex",
    width: "100%",
    // backgroundColor: "orange",
    marginTop: 100,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    width: "100%",
    // backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    backgroundColor: "whitesmoke",
    marginTop: 20,
    height: 50,
    paddingHorizontal: 10,
  },
  logoText: {
    fontSize: 20,
    paddingHorizontal: 5,
    fontWeight: "500",
    color: "#6e7a6e",
  },
  mainContainer: {
    display: "flex",
    backgroundColor: "whitesmoke",
    height: "100%",
    width: "100%",
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "center",
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    width: "100%",
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  submitButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#6e7a6e",
    paddingVertical: 15,
    width: "70%",
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 30,
    borderRadius: 30,
  },
  inputBox: {
    height: 70,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderColor: "#6e7a6e",
    padding: 10,
    borderRadius: 8,
    fontSize: 20,
    color: "#6e7a6e",
  },
  nameText: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "400",
    color: "#6e7a6e",
    // justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
    color: "whitesmoke",
    // justifyContent: "center",
  },
  subText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "400",
    color: "brown",
    // justifyContent: "center",
  },
  role: {
    fontSize: 19,
    textAlign: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
