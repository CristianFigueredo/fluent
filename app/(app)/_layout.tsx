import { Stack } from "expo-router";

import { colors } from "@/constants/colors";

export const unstable_settings = {
	initialRouteName: "welcome",
};

export default function AppLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="welcome" />
			<Stack.Screen
				name="sign-up"
				options={{
					presentation: "modal",
					headerShown: true,
					headerTitle: "Sign Up",
					headerStyle: {
						backgroundColor: colors.dark.background,
					},
					headerTintColor: colors.dark.foreground,
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen
				name="sign-in"
				options={{
					presentation: "modal",
					headerShown: true,
					headerTitle: "Sign In",
					headerStyle: {
						backgroundColor: colors.dark.background,
					},
					headerTintColor: colors.dark.foreground,
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen name="(protected)" />
		</Stack>
	);
}
