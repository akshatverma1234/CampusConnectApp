import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../configs/FirebaseConfig";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/SignIn");
  };

  return (
    <View className="flex-1 bg-white p-6 items-center justify-center">
      <Text className="text-3xl font-bold text-blue-900 mb-4">My Profile</Text>
      <Text className="text-lg text-gray-600 mb-6">
        {auth.currentUser?.email}
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 px-6 py-3 rounded-2xl"
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
