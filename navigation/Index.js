import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Home from "../screens/Home";
import Next from "../screens/Next";
import Vote from "../screens/Vote";
import Result from "../screens/Result";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
    //   linking={LinkingConfiguration}
    //   theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Vote" component={Vote} />
      <Stack.Screen name="Next" component={Next} />
      <Stack.Screen name="Result" component={Result} />

      {/* <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
    </Stack.Navigator>
  );
}
