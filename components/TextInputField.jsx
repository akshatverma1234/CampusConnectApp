import { Text, TextInput, View } from "react-native";

const TextInputField = ({ label, onChangeText, secureTextEntry }) => {
  return (
    <View className="mb-5 w-full">
      <Text className="text-gray-700 font-medium mb-2 text-[16px]">
        {label}
      </Text>
      <TextInput
        placeholder={label}
        placeholderTextColor="#9ca3af"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className="border border-gray-300 rounded-xl px-4 py-3 text-[16px] text-gray-800 bg-white shadow-sm"
      />
    </View>
  );
};

export default TextInputField;
