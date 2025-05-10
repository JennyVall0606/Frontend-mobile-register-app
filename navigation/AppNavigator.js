import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import CattleScreen from "../screens/CattleList_Screen";
import ControlScreen from "../screens/controlsH_screen";
import FormScreen from "../screens/forms_screen";
import HomeScreen from "../screens/home_screen";
import LoginScreen from "../screens/login_screen";
import RegisterCattleScreen from "../screens/register_cattle_screen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CattleScreen"
        component={CattleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterCattle"
        component={RegisterCattleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ControlScreen"
        component={ControlScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
