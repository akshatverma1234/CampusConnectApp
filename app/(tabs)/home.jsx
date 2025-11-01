import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import eventsData from "../../assets/events.json";
import { auth } from "../../configs/FirebaseConfig";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setEvents(eventsData);
    setFilteredEvents(eventsData);
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    if (query.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.category?.toLowerCase().includes(query)
      );
      setFilteredEvents(filtered);
    }
  }, [search, events]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-gradient-to-b bg-gray-900 rounded-b-3xl shadow-lg">
        <View className="items-center pt-6 pb-8 px-6">
          <View className="flex-row items-center justify-center mb-4">
            <View className="bg-cyan-400 p-3 rounded-full mr-3">
              <FontAwesome6 name="graduation-cap" size={32} color="#0f172a" />
            </View>
            <Text className="text-4xl font-extrabold text-white">
              Campus Connect
            </Text>
          </View>

          <Text className="text-gray-200 text-base font-medium mb-6">
            Hello,{" "}
            <Text className="text-cyan-300 font-semibold">
              {auth.currentUser?.displayName || "User"}!
            </Text>{" "}
            Discover Events
          </Text>

          <View className="flex-row items-center bg-white rounded-full px-4 py-3 w-full shadow-md">
            <EvilIcons name="search" size={24} color="#64748b" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search events or categories..."
              placeholderTextColor="gray"
              className="flex-1 ml-3 text-base text-gray-800"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <EvilIcons name="close" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row gap-3 px-6 py-5">
        <TouchableOpacity
          className="flex-1 bg-gradient-to-r bg-yellow-300 rounded-2xl py-4 flex items-center justify-center shadow-md"
          activeOpacity={0.8}
          onPress={() => router.push("/registeredEvents")}
        >
          <Text className="font-semibold text-gray-900 text-base">
            Registered Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-gradient-to-r bg-blue-400 rounded-2xl py-4 flex items-center justify-center shadow-md"
          activeOpacity={0.8}
          onPress={() => router.push("/upcomingEvents")}
        >
          <Text className="font-semibold text-white text-base">
            All Upcoming Events
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 mb-3">
        <Text className="text-3xl font-bold text-slate-900">
          Latest Upcoming Events
        </Text>
      </View>

      <View className="flex-1 px-6 pb-4 bg-white">
        <FlatList
          data={filteredEvents.slice(0, 3)} // 👈 only 3 latest
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-16">
              <Text className="text-center text-gray-500 text-lg font-medium">
                No events found.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg">
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() =>
                  router.push({ pathname: "/eventDetails", params: item })
                }
              >
                <Text className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </Text>

                <Text className="text-gray-600 text-sm leading-5 mb-4">
                  {item.description.slice(0, 50)}...
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center mb-4">
                <View className="bg-green-300 rounded-full px-4 py-2">
                  <Text className="text-gray-900 font-bold text-xs uppercase text-center">
                    {item.category}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
                <Text className="text-sm text-gray-700 font-medium flex-1">
                  📅 {item.date}
                </Text>
                <Text className="text-sm text-gray-700 font-medium flex-1 text-right">
                  📍 {item.location}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
