import PasswordInput from "@/components/PasswordInput";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    if (password !== confirmPassword) {
      Alert.alert(t("signup.passwordsMismatch"));
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
    else if (!session) Alert.alert(t("signup.checkInbox"));
    setLoading(false);
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">{t("signup.title")}</Text>
      <View className="w-3/4 flex flex-col gap-4">
        <TextInput
          className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("common.username")}
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("common.email")}
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          visible={visible}
          setVisible={setVisible}
          placeholder={t("common.password")}
        />
        <PasswordInput
          visible={visible}
          setVisible={setVisible}
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder={t("common.confirmPassword")}
        />
        <Button
          title={t("signup.title")}
          onPress={(e) => {
            setLoading(true);
            e.preventDefault();
            signUpWithEmail();
          }}
        />
      </View>
      <Text className="mt-4">{t("signup.hasAccount")}</Text>
      <Link href="/login">
        <Text className="mt-2 text-blue-500">{t("signup.loginLink")}</Text>
      </Link>
    </SafeAreaView>
  );
}
