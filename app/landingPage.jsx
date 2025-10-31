import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Button from "../components/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#a9d0e8", "#fafafa", "#ffffff"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1 items-center justify-center px-6"
    >
      <View className="flex-row items-center justify-center mb-6 mt-8">
        <FontAwesome6 name="graduation-cap" size={70} color="#1E3A8A" />
        <Text className="text-4xl font-extrabold text-blue-900 ml-3">
          Campus Connect
        </Text>
      </View>

      <Text className="text-lg text-gray-700 text-center mb-10 px-4">
        Discover all the exciting events happening across your university
        campus. From tech talks to sports day, find your next adventure!
      </Text>

      <Button
        text="Get Started"
        onPress={() => router.push("/(auth)/SignUp")}
      />

      <Pressable className="mt-3" onPress={() => router.push("/(auth)/SignIn")}>
        <Text className="text-[16px] text-center text-gray-400">
          Already have an account?{" "}
          <Text className="text-blue-700 font-semibold">Sign In Here</Text>
        </Text>
      </Pressable>
    </LinearGradient>
  );
}
