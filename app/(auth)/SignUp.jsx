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
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-100 to-white px-6 pt-24">
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
