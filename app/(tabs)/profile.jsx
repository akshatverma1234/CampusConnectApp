import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../configs/FirebaseConfig";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            setLoading(true);
            await signOut(auth);
            router.replace("/(auth)/SignIn");
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const user = auth.currentUser;
  const displayName = user?.displayName || "User";
  const email = user?.email || "No email";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-6 pt-8 pb-6">
          <View className="bg-yellow-400 rounded-3xl p-8 shadow-md items-center mb-6">
            <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-4xl font-bold">{initials}</Text>
            </View>

            <Text className="text-2xl font-bold text-slate-900 mb-2 text-center">
              {displayName}
            </Text>

            <View className="flex-row items-center mb-6">
              <Text className="text-gray-900 ml-2 text-center flex-1">
                Email: {email}
              </Text>
            </View>

            <View className="bg-green-100 rounded-full px-4 py-2 flex-row items-center">
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#16a34a"
              />
              <Text className="text-green-700 font-semibold ml-2 text-sm">
                Active
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="px-6 pb-6 pt-4 border-t border-gray-200 bg-white"
        style={{ marginBottom: 75 }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          className="bg-red-600 px-6 py-4 rounded-2xl active:opacity-80"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            <MaterialCommunityIcons name="logout" size={22} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              {loading ? "Logging out..." : "Logout"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
