import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisteredEvents() {
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load events from AsyncStorage
  const loadRegistered = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem("registeredEvents");
      if (stored) {
        setRegistered(JSON.parse(stored));
      } else {
        setRegistered([]);
      }
    } catch (error) {
      console.error("Error loading registered events:", error);
      setRegistered([]);
    } finally {
      setLoading(false);
    }
  };

  // Unregister event handler
  const handleUnregister = async (eventId) => {
    Alert.alert(
      "Unregister Event",
      "Are you sure you want to unregister from this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Unregister",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedEvents = registered.filter(
                (event) => event.id !== eventId
              );
              await AsyncStorage.setItem(
                "registeredEvents",
                JSON.stringify(updatedEvents)
              );
              setRegistered(updatedEvents);
              Alert.alert("Success", "You have unregistered from the event.");
            } catch (error) {
              console.error("Error unregistering:", error);
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadRegistered();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <View className="bg-gradient-to-b bg-orange-600 rounded-b-3xl shadow-custom">
        <View className="flex-row items-center mb-2 mt-16 p-8">
          <MaterialCommunityIcons
            name="bookmark-check"
            size={28}
            color="white"
          />
          <Text className="text-3xl font-bold text-white ml-3">
            My Registered Events
          </Text>
        </View>
        <Text className="text-white text-[16px] mt-2 ml-8 mb-2">
          Total Events:{" "}
          <Text className="text-cyan-300 font-semibold text-[16px]">
            {registered.length}
          </Text>
        </Text>
      </View>

      <View className="flex-1 px-6 py-6">
        {loading ? (
          <View className="items-center justify-center flex-1">
            <MaterialCommunityIcons name="loading" size={48} color="#64748b" />
            <Text className="text-gray-500 mt-4 font-medium">
              Loading events...
            </Text>
          </View>
        ) : registered.length === 0 ? (
          <View className="items-center justify-center flex-1">
            <MaterialCommunityIcons
              name="calendar-blank"
              size={80}
              color="#cbd5e1"
            />
            <Text className="text-gray-600 text-lg font-semibold mt-4 text-center">
              No Registered Events Yet
            </Text>
            <Text className="text-gray-500 text-center mt-2 text-sm">
              Start exploring and register for upcoming events!
            </Text>
          </View>
        ) : (
          <FlatList
            data={registered}
            keyExtractor={(item) => item.id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <View className="bg-white rounded-2xl p-5 mb-4 shadow-custom">
                <View className="flex-row items-start justify-between mb-3">
                  <Text className="text-lg font-bold text-slate-900 flex-1 mr-2">
                    {item.title}
                  </Text>

                  <View className="bg-green-400 rounded-full px-3 py-1">
                    <Text className="text-xs font-bold text-gray-900">
                      {item.category || "Event"}
                    </Text>
                  </View>
                </View>

                {item.description && (
                  <Text className="text-gray-600 text-sm leading-5 mb-3">
                    {item.description.slice(0, 60)}...
                  </Text>
                )}

                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                  <View className="flex-row items-center mb-2">
                    <MaterialCommunityIcons
                      name="calendar"
                      size={16}
                      color="#64748b"
                    />
                    <Text className="text-gray-700 text-sm font-medium ml-2">
                      {item.date}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      color="#64748b"
                    />
                    <Text className="text-gray-700 text-sm font-medium ml-2">
                      {item.location}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="bg-blue-500 rounded-lg py-2 px-3 flex-1 mr-2 active:opacity-80"
                    onPress={() =>
                      router.push({ pathname: "/eventDetails", params: item })
                    }
                  >
                    <Text className="text-white font-semibold text-center text-sm">
                      View Details
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-red-500 rounded-lg py-2 px-3 flex-1 ml-2 active:opacity-80"
                    onPress={() => handleUnregister(item.id)}
                  >
                    <Text className="text-white font-semibold text-center text-sm">
                      Unregister
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
