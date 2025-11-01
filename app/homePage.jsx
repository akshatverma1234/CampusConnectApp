import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import eventsData from "../assets/events.json";

const homePage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setEvents(eventsData);
  }, []);
  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-3xl font-bold text-blue-900 mb-4 pt-8">
        Upcoming Events
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-purple-100 p-4 mb-3 rounded-2xl"
            onPress={() =>
              router.push({ pathname: "/eventDetails", params: item })
            }
          >
            <Text className="text-xl font-semibold text-blue-900">
              {item.title}
            </Text>
            <Text className="text-gray-600 mt-1">{item.date}</Text>
            <Text className="text-gray-500 mt-1">{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default homePage;
