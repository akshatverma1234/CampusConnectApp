import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EventDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const stored = await AsyncStorage.getItem("registeredEvents");
        const registered = stored ? JSON.parse(stored) : [];
        const alreadyRegistered = registered.some((e) => e.id === params.id);
        setIsRegistered(alreadyRegistered);
      } catch (error) {
        console.error("Error checking registration:", error);
      }
    };
    checkRegistration();
  }, [params.id]);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem("registeredEvents");
      let registered = stored ? JSON.parse(stored) : [];

      if (registered.find((e) => e.id === params.id)) {
        Alert.alert("Notice", "You have already registered for this event.");
        setIsRegistered(true);
        return;
      }

      registered.push(params);
      await AsyncStorage.setItem(
        "registeredEvents",
        JSON.stringify(registered)
      );

      setIsRegistered(true);
      Alert.alert(
        "Success",
        "You have successfully registered for this event!"
      );
    } catch (error) {
      Alert.alert("Error", "Unable to register for the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 py-6 pt-10"
      >
        <View className="bg-white rounded-2xl p-5 mb-5 mt-16 shadow-custom">
          <View className="flex-row items-start justify-between mb-3 shadow-custom">
            <Text className="text-3xl font-bold text-slate-900 flex-1 mr-2 shadow-custom ">
              {params.title}
            </Text>
            {params.category && (
              <View className="bg-emerald-400 rounded-full px-3 py-1 shadow-custom">
                <Text className="text-xs font-bold text-gray-900">
                  {params.category}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-5 shadow-custom">
          <Text className="text-gray-600 text-base leading-6">
            {params.description}
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-5 shadow-custom">
          <View className="mb-4 pb-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="calendar"
                size={24}
                color="#64748b"
              />
              <View className="ml-4 flex-1">
                <Text className="text-gray-500 text-sm font-medium">Date</Text>
                <Text className="text-slate-900 text-lg font-semibold">
                  {params.date}
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-4 pb-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#64748b"
              />
              <View className="ml-4 flex-1">
                <Text className="text-gray-500 text-sm font-medium">
                  Location
                </Text>
                <Text className="text-slate-900 text-lg font-semibold">
                  {params.location}
                </Text>
              </View>
            </View>
          </View>

          {params.time && (
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="clock" size={24} color="#64748b" />
              <View className="ml-4 flex-1">
                <Text className="text-gray-500 text-sm font-medium">Time</Text>
                <Text className="text-slate-900 text-lg font-semibold">
                  {params.time}
                </Text>
              </View>
            </View>
          )}
        </View>

        {isRegistered && (
          <View className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5 flex-row items-center">
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="#16a34a"
            />
            <Text className="text-green-700 font-semibold ml-3">
              You are registered for this event
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="px-6 pb-6 pt-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          className={`py-4 px-5 rounded-2xl mb-3 ${
            isRegistered ? "bg-gray-300" : "bg-blue-600"
          }`}
          onPress={handleRegister}
          disabled={isRegistered || loading}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading
              ? "Processing..."
              : isRegistered
              ? "Already Registered"
              : "Register Now"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3 px-5 rounded-2xl border border-blue-600"
          onPress={() => router.push("/registeredEvents")}
          activeOpacity={0.8}
        >
          <Text className="text-blue-600 text-center font-semibold">
            View My Events
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
