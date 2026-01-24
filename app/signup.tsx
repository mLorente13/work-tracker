import PasswordInput from "@/components/PasswordInput";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      setLoading(false);
      return;
    }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { username: username },
      },
    });
    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">Sign Up</Text>
      <View className="w-3/4 flex flex-col gap-4">
        <TextInput
          className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Email"
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          visible={visible}
          setVisible={setVisible}
          placeholder="Password"
        />
        <PasswordInput
          visible={visible}
          setVisible={setVisible}
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder="Confirm Password"
        />
        <Button
          title="Sign Up"
          onPress={(e) => {
            setLoading(true);
            e.preventDefault();
            signUpWithEmail();
          }}
        />
      </View>
      <Text className="mt-4">Already have an account?</Text>
      <Link href="/login">
        <Text className="mt-2 text-blue-500">Login</Text>
      </Link>
    </SafeAreaView>
  );
}
