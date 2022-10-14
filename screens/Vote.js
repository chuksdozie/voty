import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import registeredVotersData from "../data/registeredVotersData";
// import { candidates } from "../data/candidatesData";
import * as Updates from "expo-updates";
import axiosService from "../utils/axiosService";
import { getVoters, getCandidates } from "../constants/urls";
import { storeData } from "../utils/db";
import { ActivityIndicator } from "react-native";

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
} from "react-native";
import OptionTag from "../components/OptionTag";
import Candidate from "../components/Candidate";

// import { Text, View } from "../components/Themed";

export default function Home({ navigation }) {
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

  useEffect(() => {
    // setCandidate
    getAllCandidates();
  }, []);

  const handleVote = async () => {
    try {
      const result = await axiosService.put(
        `https://votyserve.herokuapp.com/voter/${voter.voterId}/${selectedCandidate.candidateId}`
      );
      console.log(909, result.data.data);
      setStage("feedback");
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error.response.data);
    }
  };
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
        <Ionicons
          name="caret-back-circle-outline"
          color={"#6e7a6e"}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.logoText}>{"Good day"}</Text>
      </View>
      {/* <View style={styles.headerSpacer}>
        <Ionicons name="person-circle" color={"#86c0c6"} size={70} />
      </View> */}
      {stage === "default" ? (
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            {/* <Image source={}/> */}
            <Text style={styles.nameText}>Please enter your voting ID</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={"Example: VXD-7w84d"}
              textAlign="center"
              selectionColor={"#6e7a6e"}
              value={voterId}
              onChangeText={(e) => handleVoterIdChange(e)}
            />
            <Text style={styles.subText}>
              Please note that, you won't be allowed to vote twice.{"\n"} So be
              sure to vote only when you are ready.
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={() => submitVoterId()}
              disabled={loading}
            >
              {loading && <ActivityIndicator color={"white"} />}
              <Text style={styles.buttonText}>
                {loading ? `Please wait...` : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={errorModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!errorModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Error</Text>
                <Text style={styles.modalText}>{error}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setErrorModalVisible(!errorModalVisible);
                    setError("");
                  }}
                >
                  <Text style={styles.textStyle}>Try Again</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : stage === "voting" ? (
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            {/* <Image source={}/> */}
            <Text style={styles.nameText}>Who would you like to vote for?</Text>
            <ScrollView style={styles.optionContainer}>
              {candidates.map((i, index) => (
                <Candidate
                  key={index}
                  name={`${i.lastName} ${i.lastName}`}
                  candidateId={i.candidateId}
                  party={i.party}
                  icon="person"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSelectedCandidate(i);
                    console.log(123456, selectedCandidate);
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {`Are you sure you want to vote for ${selectedCandidate?.firstName} ${selectedCandidate?.lastName} of ${selectedCandidate?.party}?`}
                </Text>
                <Text style={styles.modalText}>
                  Please be reminded that you wont be allowed to vote more than
                  once.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    // setModalVisible(!modalVisible);

                    // call the vote route
                    handleVote();
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => {
                    console.log("cancelled");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Not sure, Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : stage === "feedback" ? (
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            {/* <Image source={}/> */}
            <Text style={styles.nameText}>
              Your vote has been successfully placed. {"\n"} The results will be
              out shortly.
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#6e7a6e",
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
