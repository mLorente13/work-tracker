import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      setEmail("");
      setPassword("");
      router.navigate("/");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">{t("login.title")}</Text>
      <View className="w-3/4 flex flex-col gap-4">
        <TextInput
          className="mt-4 w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder={t("common.email")}
          placeholderTextColor="#888"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <PasswordInput password={password} setPassword={setPassword} />
      </View>
      <Pressable
        disabled={loading}
        className="mt-4 w-3/4 rounded bg-blue-500 px-4 py-2"
        onPress={(e) => {
          setLoading(true);
          e.preventDefault();
          signInWithEmail();
        }}
      >
        <Text className={`text-center text-white`}>{t("common.login")}</Text>
      </Pressable>
      <View className="w-full flex items-center">
        <Text className="mt-4">{t("login.noAccount")}</Text>
        <Link href="/signup">
          <Text className="mt-2 text-blue-500">{t("login.signupLink")}</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
