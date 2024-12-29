import "../global.css";

import { Slot } from "expo-router";

import { SupabaseProvider } from "@/context/supabase-provider";
import { registerGlobals } from "@livekit/react-native";
import { colors } from "@/constants/colors";
import { StatusBar } from "react-native";

registerGlobals();

export default function AppLayout() {
	return (
		<SupabaseProvider>
			<StatusBar
				barStyle="light-content"
				backgroundColor={colors.dark.background}
			/>
			<Slot />
		</SupabaseProvider>
	);
}
