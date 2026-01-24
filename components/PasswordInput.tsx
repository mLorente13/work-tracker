import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  placeholder?: string;
}

export default function PasswordInput({
  setPassword,
  visible,
  setVisible,
  placeholder,
}: Readonly<PasswordInputProps>) {
  return (
    <View className="w-full relative">
      <TextInput
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!visible}
        placeholder={placeholder || "Password"}
        className={
          "w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        }
      />
      <Pressable
        className="absolute right-4 top-1/2 -translate-y-1/2 m-0 p-0"
        onPress={() => setVisible(!visible)}
      >
        {visible ? (
          <Eye size={20} color="#888" />
        ) : (
          <EyeOff size={20} color="#888" />
        )}
      </Pressable>
    </View>
  );
}
