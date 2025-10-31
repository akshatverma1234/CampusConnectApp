import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-lime-400"
    >
      <Redirect href={"/landingPage"} />
    </View>
  );
}
