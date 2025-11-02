import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import Button from "../../components/Button";
import TextInputField from "../../components/TextInputField";
import { auth, db } from "../../configs/FirebaseConfig";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onBtnPress = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
        registeredEvents: [],
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/(auth)/SignIn");
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b bg-white px-6 pt-16">
      <View className="items-center pt-12 pb-8">
        <View className="bg-cyan-400 p-4 rounded-full mb-2">
          <FontAwesome6 name="graduation-cap" size={48} color="#0f172a" />
        </View>
        <Text className="text-3xl font-extrabold text-gray-900">
          Campus <Text className="text-cyan-400">Connect</Text>
        </Text>
        <Text className="text-gray-800 text-sm mt-2">
          Discover & Register for Events
        </Text>
      </View>
      <Text className="text-3xl font-extrabold text-blue-900 text-center mb-8">
        Create New Account
      </Text>

      <View className="w-full space-y-4">
        <TextInputField label="Full Name" onChangeText={setName} />
        <TextInputField label="College Email" onChangeText={setEmail} />
        <TextInputField
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1E3A8A" className="mt-4" />
        ) : (
          <Button text="Create Account" onPress={onBtnPress} />
        )}
      </View>

      <Text
        className="text-gray-500 text-center mt-6"
        onPress={() => router.push("/(auth)/SignIn")}
      >
        Already have an account?{" "}
        <Text className="text-blue-700 font-semibold">Sign In</Text>
      </Text>
    </View>
  );
}
