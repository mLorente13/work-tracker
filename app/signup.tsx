import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">Login</Text>
      <TextInput
        className="mt-4 w-3/4 rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        placeholder="Username"
        placeholderTextColor="#888"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="mt-4 w-3/4 rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        className="mt-4 w-3/4 rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        title="Sign Up"
        onPress={(e) => {
          setLoading(true);
          e.preventDefault();
          signUpWithEmail();
        }}
      />
    </SafeAreaView>
  );
}
