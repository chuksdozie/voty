import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// import { Text, View } from "../components/Themed";

export default function Next({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSpacer}>
        <Ionicons name="person-circle" color={"#86c0c6"} size={70} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>Justina Bornson</Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "white",
              marginVertical: 5,
            }}
          ></View>
          <Text style={styles.role}>Administrator</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerSpacer: {
    flex: 1,
    // backgroundColor: "orange",
    marginTop: 50,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#86c0c6",
    height: 100,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
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
