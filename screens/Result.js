import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import registeredVotersData from "../data/registeredVotersData";
// import { candidates } from "../data/candidatesData";
import * as Updates from "expo-updates";
import axiosService from "../utils/axiosService";
import { getVoters, getCandidates } from "../constants/urls";
import { storeData } from "../utils/db";
import { ActivityIndicator } from "react-native";
import { countdownTimer } from "../utils/countdownTimer";

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
  Alert,
  Modal,
  StatusBar,
  Pressable,
  SafeAreaView,
} from "react-native";
import OptionTag from "../components/OptionTag";
import Candidate from "../components/Candidate";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

// import { Text, View } from "../components/Themed";

export default function Result({ navigation }) {
  // possible values [ default, voting, feeadback ]
  const [stage, setStage] = useState("default");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState();
  const [selectedCandidate, setSelectedCandidate] = useState();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameOfCandidates, setNameOfCandidates] = useState([]);
  const [numOfVotes, setNumOfVotes] = useState([]);
  const [timeleft, setTimeleft] = useState(countdownTimer);
  const getAllVoterIds = async (value) => {
    try {
      setLoading(true);
      if (!value) {
        setError("Please enter a voter ID");
        setErrorModalVisible(true);
        setLoading(false);
        return;
      }
      const response = await axiosService.get(getVoters);
      console.log(12112, response.data.data);
      const voters = response.data.data;
      const verifiedVoter = voters.filter((voter) => voter.voterId === value);
      console.log(345678, verifiedVoter);
      if (!verifiedVoter[0]) {
        setError("No Record for this voter found");
        setErrorModalVisible(true);
        setLoading(false);
        return;
      }
      await storeData("voter", JSON.stringify(verifiedVoter[0]));
      setVoter(verifiedVoter[0]);
      setStage("voting");
      console.log("free", verifiedVoter[0]);
      // if (!voterIds.includes(value)) {
      //   setError("No Record for this voter found");
      //   setErrorModalVisible(true);
      // } else {
      //   setStage("voting");
      // }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("wahala dey o", error);
    }
  };

  const getAllCandidates = async () => {
    try {
      const response = await axiosService.get(getCandidates);
      console.log(response.data.data);
      setCandidates(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onReloadPress = useCallback(() => {
    if (Platform.OS === "web") {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);
  const handleVoterIdChange = (e) => {
    console.log(e);
    setVoterId(e);
    console.log(voterId);
  };
  const submitVoterId = () => {
    getAllVoterIds(voterId);
    console.log(error);
  };

  // useEffect(() => {
  //   // setCandidate
  //   getAllCandidates();
  // }, []);

  const handleVote = async () => {
    setLoading(true);
    try {
      // setNameOfCandidates([]);
      // setNumOfVotes([]);
      const result = await axiosService.get(`/candidate`);

      console.log(909, result.data.data);
      // setStage("feedback");
      // setModalVisible(!modalVisible);
      const candidates = result.data.data;
      candidates.filter((cand) => {
        nameOfCandidates.push(cand.firstName);
        numOfVotes.push(cand.voters.length);
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      return;
    }
  };

  setInterval(function () {
    setTimeleft(countdownTimer);
    // console.log(7777, x);
  }, 1000);

  useEffect(() => {
    handleVote();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
        showHideTransition="slide"
      /> */}
      {/* <View style={styles.headerSpacer}></View> */}

      <View style={{ display: "flex", alignItems: "center", marginTop: 100 }}>
        {/* <Text>Bezier Line Chart</Text> */}
        {loading ? (
          <ActivityIndicator size={40} />
        ) : (
          <>
            <View style={styles.timerDiv}>
              <Text style={styles.clockTextHeader}>Time left for voting</Text>
              {timeleft && (
                <Text style={styles.clockText}>
                  {`${timeleft?.days} days : ${timeleft?.hours} hrs : ${timeleft?.minutes} mins : ${timeleft?.seconds} secs` ||
                    ""}
                </Text>
              )}
            </View>
            <BarChart
              data={{
                labels: nameOfCandidates,
                datasets: [
                  {
                    data: numOfVotes,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              // width={"80%"}
              height={220}
              // yAxisLabel="$"
              // yAxisSuffix="M"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#6e7a6e",
                backgroundGradientFrom: "#6e7a6e",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "15",
                  stroke: "#ffa726",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 5,
              }}
            />
            <Text>Presidential Election Live Polls</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#6e7a6e",
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    // paddingTop: StatusBar.currentHeight,
  },
  headerSpacer: {
    display: "flex",
    width: "100%",
    backgroundColor: "orange",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    fontSize: 16,
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
    // flexDirection: "row",
    // backgroundColor: "red",
    width: "80%",
    // alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    marginVertical: 10,
    borderTopWidth: 1,
    borderColor: "orange",
  },
  submitButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#6e7a6e",
    paddingVertical: 15,
    width: "70%",
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    borderRadius: 30,
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
  inputBox: {
    height: 70,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderColor: "#6e7a6e",
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    color: "#6e7a6e",
  },
  nameText: {
    fontSize: 15,
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
    marginHorizontal: 5,

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "auto",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "100%",
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#6e7a6e",
  },
  buttonCancel: {
    backgroundColor: "#780f0f",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 17,
    textAlign: "center",
  },
});
