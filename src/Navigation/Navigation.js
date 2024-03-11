import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animation from "../screens/Animation";
import Register from "../screens/Register";
import Home from "../screens/Page";
import Page from "../screens/Page";


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Animation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Animation" component={Animation} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Page" component={Page} />
      {/*  />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Destination" component={Destination} /> */}
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
