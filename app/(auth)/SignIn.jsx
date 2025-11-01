import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import TextInputField from "../../components/TextInputField";
import { auth } from "../../configs/FirebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Welcome back!");

      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-purple-100 px-6 pt-24">
      <Text className="text-3xl font-extrabold text-blue-900 mt-[40px] text-center">
        Welcome Back
      </Text>

      <View className="mt-6">
        <TextInputField
          label="College Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInputField
          label="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <Button
          text={loading ? "Signing In..." : "Sign In"}
          onPress={handleSignIn}
        />
      </View>

      <View className="mt-6 flex-row items-center justify-center">
        <Text className="text-gray-500">Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
          <Text className="text-blue-700 font-semibold">Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
