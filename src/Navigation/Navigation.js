import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Animation from "../screens/Animation";
import Register from "../screens/Register";
import Page from "../screens/Page";
import PrivacyStatement from "./Drawer/PrivacyStatement";
import HowToUseVideo from "./Drawer/HowToUseVideo";
import License from "./Drawer/License";
import RaisePrintechText from "./Drawer/RaisePrintechText ";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Animation">
      <Stack.Screen
        name="Animation"
        component={Animation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Page"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Page">
      <Drawer.Screen name="Home" component={Page} />
      <Drawer.Screen
        name="Raise a Printech Text"
        component={RaisePrintechText}
      />
      <Drawer.Screen name="How to Use Video" component={HowToUseVideo} />
      <Drawer.Screen name="License" component={License} />
      <Drawer.Screen name="Privacy Statement" component={PrivacyStatement} />
    </Drawer.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
