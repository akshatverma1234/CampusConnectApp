import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyEvents() {
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Error loading events:", error);
      setRegistered([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRegistered();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-gray-800 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center mb-2 mt-16 p-8">
          <MaterialCommunityIcons
            name="calendar-check"
            size={28}
            color="#06b6d4"
          />
          <Text className="text-3xl font-bold text-white ml-3">My Events</Text>
        </View>
        <Text className="text-gray-300 text-[16px] mt-2 ml-8 mb-2">
          Registered:{" "}
          <Text className="text-cyan-300 text-[16px] font-semibold">
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
              No Events Registered Yet
            </Text>
            <Text className="text-gray-500 text-center mt-2 text-sm">
              Explore and register for upcoming events!
            </Text>
          </View>
        ) : (
          <FlatList
            data={registered}
            keyExtractor={(item) => item.id?.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white rounded-2xl p-5 mb-4 shadow-lg active:shadow-lg"
                activeOpacity={0.75}
              >
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

                {/* Description */}
                {item.description && (
                  <Text className="text-gray-600 text-sm leading-5 mb-3">
                    {item.description.slice(0, 60)}...
                  </Text>
                )}

                {/* Details */}
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
                  {item.location && (
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
                  )}
                </View>

                {/* Status Badge */}
                <View className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg py-2 px-3 flex-row items-center justify-center">
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="#06b6d4"
                  />
                  <Text className="text-blue-700 font-semibold text-sm ml-2">
                    Registered
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
