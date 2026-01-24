import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { session, signOut } = useAuth() as {
    session: {
      user: { id: string; user_metadata?: { username?: string } };
    } | null;
    signOut: () => void;
  };
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser(data);
      }
    };
    fetchUser();
  }, [session?.user.id]);

  return (
    <SafeAreaView className="w-10/12 mx-auto flex-1">
      <Text className="mb-4 text-2xl font-bold">Ajustes</Text>
      <View>
        <Text className="text-lg">Tiempo de descanso configurado:</Text>
        <TextInput
          className="mb-4 mt-2 rounded border border-gray-300 px-3 py-2"
          keyboardType="numeric"
          value={user?.break_time.toString() || ""}
          onChangeText={(text) =>
            setUser({ ...user, break_time: Number(text) })
          }
          onEndEditing={async () => {
            const { data, error } = await supabase
              .from("profiles")
              .update({ break_time: user?.break_time })
              .eq("id", session?.user.id)
              .select();
            if (error) {
              console.error("Error updating break time:", error);
            } else {
              console.log("Break time updated successfully:", data);
            }
          }}
        />
      </View>
      <Pressable
        className="absolute bottom-4 w-full rounded-full px-4 py-2 bg-red-500 flex-row items-center justify-center gap-2"
        onPress={signOut}
      >
        <Text className="text-white font-bold py-2">Cerrar sesión</Text>
        <LogOut size={20} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
