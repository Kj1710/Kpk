import React from "react";
import { View, Text, TouchableOpacity, StyleSheet , Linking} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

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
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#ffa242',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("NewLabel1")}>
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
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          // Open Amazon link
          Linking.openURL("https://amzn.eu/d/dsg0rHS");
        }}
      >
        <Ionicons name="cart-outline" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
