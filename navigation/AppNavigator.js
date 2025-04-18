import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome_screen";
import LoginScreen from "../screens/login_screen";
import HomeScreen from "../screens/home_screen";
import RegisterCattleScreen from "../screens/register_cattle_screen"; // Asegúrate de que esté bien importado
import ControlScreen from "../screens/controlsH_screen"; // Asegúrate de que esté bien importado
import WeightScreen from "../screens/weight_history_screen";
import VaccinesScreen from "../screens/vaccines_history_screen";
import FormScreen from "../screens/forms_screen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
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
        name="WeightScreen"
        component={WeightScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VaccinesScreen"
        component={VaccinesScreen}
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
