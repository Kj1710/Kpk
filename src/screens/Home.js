import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  button: {
    width: "100%",
    marginVertical: 15,
    paddingVertical: 15,
    backgroundColor: "#ffa242",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 23,
    color: "#fff",
  },
});

const Home = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("NewLabel")}>
        <Text style={styles.buttonText}>New Label</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("SavedLabel")}>
        <Text style={styles.buttonText}>Saved Label</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("History")}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("LocalTemplate")}>
        <Text style={styles.buttonText}>Local Template</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
