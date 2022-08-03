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
  StatusBar,
} from "react-native";
import OptionTag from "../components/OptionTag";
import { countdownTimer } from "../utils/countdownTimer";

// import { Text, View } from "../components/Themed";

export default function Home({ navigation }) {
  const [timeleft, setTimeleft] = useState(countdownTimer);
  // console.log(222, timeleft);
  // let x;
  // useEffect(() => {
  //   // Good!
  //   // Side-effect!
  //   // let timeleft = countdownTimer;

  //   x = countdownTimer;
  //   console.log(111, x);
  // }, [countdownTimer]);

  setInterval(function () {
    setTimeleft(countdownTimer);
    // console.log(7777, x);
  }, 1000);
  const onReloadPress = useCallback(() => {
    if (Platform.OS === "web") {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
        showHideTransition="slide"
      />
      <View style={styles.headerSpacer}></View>
      <View style={styles.logo}>
        <Ionicons name="pie-chart" color={"#6e7a6e"} size={30} />
        <Text style={styles.logoText}>Voty</Text>
      </View>
      <View style={styles.timerDiv}>
        <Text style={styles.clockTextHeader}>Time left to election</Text>
        {timeleft && (
          <Text style={styles.clockText}>
            {`${timeleft?.days} days : ${timeleft?.hours} hrs : ${timeleft?.minutes} mins : ${timeleft?.seconds} secs` ||
              ""}
          </Text>
        )}
      </View>
      {/* <View style={styles.headerSpacer}>
        <Ionicons name="person-circle" color={"#86c0c6"} size={70} />
      </View> */}
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          {/* <Image source={}/> */}

          <Text style={styles.nameText}>I am here to</Text>
          <View style={styles.optionContainer}>
            <OptionTag
              label="Place a vote"
              icon="checkmark-done"
              onPress={() => navigation.navigate("Vote")}
            />
            <OptionTag label="View results" icon="bar-chart-outline" />
          </View>
        </View>
      </View>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.nameText}>Justina Bornson</Text>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "white",
            marginVertical: 5,
          }}
        ></View>
        <Text style={styles.role}>Adminis</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Next")}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>Justina Bornson</Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "white",
              marginVertical: 5,
            }}
          ></View>
          <Text style={styles.role}>Adminis</Text>
        </View>
      </TouchableOpacity> */}

      {/* <View
        style={{
          flex: 1,
          backgroundColor: "plum",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 30,
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          Pretty Cool!
        </Text>
        <Button title="Run Again" onPress={onReloadPress} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#6e7a6e",
    alignItems: "center",
    // justifyContent: "center",
    height: "100%",
  },
  headerSpacer: {
    display: "flex",
    width: "100%",
    // backgroundColor: "orange",
    marginTop: 0,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    width: "100%",
    // backgroundColor: "orange",
    marginTop: 0,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "whitesmoke",
    marginTop: 20,
    height: 50,
    paddingHorizontal: 10,
  },
  timerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "whitesmoke",
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
    // alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
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
  nameText: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "400",
    color: "#6e7a6e",
    // justifyContent: "center",
  },
  clockText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "400",
    backgroundColor: "#6e7a6e",
    width: "70%",
    alignSelf: "center",
    padding: 10,
    color: "whitesmoke",
    borderRadius: 5,
    // justifyContent: "center",
  },
  clockTextHeader: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "400",
    // backgroundColor: "#6e7a6e",
    width: "70%",
    alignSelf: "center",
    padding: 5,
    color: "brown",
    borderRadius: 5,
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
