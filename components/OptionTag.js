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
} from "react-native";

// import { Text, View } from "../components/Themed";

export default function OptionTag(props) {
  const { navigation, label, icon, onPress } = props;
  const onReloadPress = useCallback(() => {
    if (Platform.OS === "web") {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Ionicons name={icon} size={50} style={styles.icon} />
        <View style={styles.bottom}>
          <Text style={styles.subText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#6e7a6e",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 130,
    height: 130,
    // borderRadius: 75,
    borderRadius: 20,
    borderTopEndRadius: 75,
    borderTopStartRadius: 75,
    borderWidth: 1,
    borderColor: "#6e7a6e",
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
  bottom: {
    display: "flex",
    backgroundColor: "#6e7a6e",
    // height: 20,
    width: "100%",
    paddingVertical: 10,
    alignSelf: "flex-end",
    // alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  icon: {
    marginBottom: 10,
    color: "#6e7a6e",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: "whitesmoke",
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
