import "react-native-gesture-handler";
import "../global.css";

import { Slot } from "expo-router";

import { SupabaseProvider } from "@/context/supabase-provider";
import { AppProvider } from "@/components/app-context";
import { ChatProvider } from "@/components/chat-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";

export default function AppLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SupabaseProvider>
				<ChatProvider>
					<AppProvider>
						<Slot />
						<StatusBar barStyle="dark-content" />
					</AppProvider>
				</ChatProvider>
			</SupabaseProvider>
		</GestureHandlerRootView>
	);
}
