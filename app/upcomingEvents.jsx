import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import eventsData from "../assets/events.json";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      className="bg-yellow-200 rounded-xl p-4 m-2 shadow"
      onPress={() =>
        router.push({
          pathname: "/(tabs)/eventDetails",
          params: { id: item.id },
        })
      }
    >
      <Text className="font-semibold text-black">{item.title}</Text>
      <Text className="text-gray-700 mt-2">{item.description}</Text>
      <Text className="text-gray-700">{item.category}</Text>
      <Text className="text-sm text-gray-600">
        📅 {item.date} | 📍 {item.location}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-left mb-4 mt-16 pt-8">
        Upcoming Events
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
