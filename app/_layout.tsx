import "../global.css";

import { Slot } from "expo-router";

import { SupabaseProvider } from "@/context/supabase-provider";
import { registerGlobals } from "@livekit/react-native";

registerGlobals();

export default function AppLayout() {
	return (
		<SupabaseProvider>
			<Slot />
		</SupabaseProvider>
	);
}
