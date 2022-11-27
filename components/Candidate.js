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

export default function Candidate(props) {
  const {
    navigation,
    name,
    party,
    candidateId,
    icon,
    onPress,
    candidatePicture,
  } = props;
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
        <View style={styles.left}>
          {/* <Ionicons name={icon} size={30} style={styles.icon} /> */}
          <Image
            source={{
              // uri: "https://media.premiumtimesng.com/wp-content/files/2022/10/78f1dc4e-142f-44e4-a328-f15724fe63d4_peter-obi.jpg",
              // uri: "https://media.premiumtimesng.com/wp-content/files/2017/01/atiku-abubakar.jpg",
              // uri: "https://media.premiumtimesng.com/wp-content/files/2022/01/Bola-Ahmed-Tinubu-.png",
              uri: candidatePicture,
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: -1,
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: 8,
            }}
          />
        </View>
        <View style={styles.right}>
          {/* <View style={styles.id}>
            <Text style={styles.candidateIdText}>{candidateId}</Text>
          </View> */}
          <Text style={styles.candidateText}>{name}</Text>
          <View style={styles.line}></View>
          <Text style={styles.partyText}>{party}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "#6e7a6e",
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "flex-end",
    width: "100%",
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6e7a6e",
    marginVertical: 10,
    // paddingHorizontal: 10,
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
  left: {
    display: "flex",
    // backgroundColor: "pink",
    height: "100%",
    width: "25%",

    // paddingVertical: 10,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  right: {
    display: "flex",
    // backgroundColor: "orange",
    height: "100%",
    width: "75%",
    paddingVertical: 10,
    alignSelf: "flex-end",
    // alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#6e7a6e",
    paddingHorizontal: 10,
    // borderBottomStartRadius: 8,
  },
  line: {
    display: "flex",
    backgroundColor: "orange",
    width: "70%",
    alignSelf: "center",
    justifyContent: "center",
    borderBottomEndRadius: 8,
    borderLeftWidth: 1,
    borderColor: "#6e7a6e",
    // borderBottomStartRadius: 8,
    borderWidth: 0.5,
  },
  id: {
    display: "flex",
    backgroundColor: "black",
    width: "auto",
    alignSelf: "flex-end",
    justifyContent: "center",
    // borderBottomEndRadius: 8,
    borderRadius: 20,
    borderLeftWidth: 1,
    borderColor: "#6e7a6e",
    // borderBottomStartRadius: 8,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: -5,
  },
  icon: {
    // marginBottom: 10,
    color: "#6e7a6e",
  },
  candidateText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "400",
    color: "#6e7a6e",
    marginVertical: 5,
    // justifyContent: "center",
  },
  partyText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
    color: "#6e7a6e",
    marginVertical: 5,
    // justifyContent: "center",
  },
  candidateIdText: {
    fontSize: 6,
    textAlign: "center",
    fontWeight: "400",
    color: "whitesmoke",
    marginVertical: 5,
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
