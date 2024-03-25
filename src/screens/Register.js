import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const checkIfUserExists = async () => {
    try {
      const userExists = await AsyncStorage.getItem("user");
      if (userExists) {
        navigation.replace("Home");
      }
    } catch (error) {
      console.log("Error checking user:", error);
    }
  };

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      number: number,
    };

    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a Valid email address");
      return;
    }
    if (number.length < 10) {
      Alert.alert("Invalid Number", "Please Give a Correct Number");
      return;
    }

    axios
      .post("http://192.168.29.184:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        navigation.replace("Home");
        AsyncStorage.setItem("user", JSON.stringify(user)); // Save user data to AsyncStorage
        setEmail("");
        setNumber("");
        setName("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error occurred during registration"
        );
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Image
            style={{ height: 200, width: "100%", resizeMode: "contain" }}
            source={require("../../assets/Raisa.jpeg")}
          />
          <Text style={styles.headerText1}>Register to your account</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputContainer}>
            <AntDesign name="lock1" size={24} color="gray" />
            <TextInput
              value={number}
              onChangeText={(text) => setNumber(text)}
              style={styles.input}
              placeholder="Enter your Number"
              placeholderTextColor="gray"
              secureTextEntry={true}
            />
          </View>

          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              AsyncStorage.setItem("user", JSON.stringify({ name, email, number }));
              console.log("User" , user)
              navigation.replace("Home");
              
            }}
            style={styles.loginText}
          >
            <Text style={styles.signupText}>
              Don't Want To Register? Click Here
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  headerText1: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: "gray",
    marginLeft: 10,
    fontSize: 17,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 6,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  loginText: {
    marginTop: 15,
  },
  signupText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    textDecorationLine: "underline",
  },
});

export default Register;
