import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="landingPage"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="(auth)/SignUp"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="(auth)/SignIn"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="homePage"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="upcomingEvents"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="eventDetails"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="registeredEvents"
        options={{ headerTransparent: true, headerTitle: "" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
