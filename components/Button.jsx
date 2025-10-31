import { Text, TouchableOpacity } from "react-native";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-blue-800 px-16 py-4 rounded-2xl mt-4 shadow-md shadow-blue-300"
    >
      <Text className="text-white text-center text-[18px] font-semibold tracking-wide">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
