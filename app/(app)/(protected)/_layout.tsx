import { Stack } from "expo-router";
import { colors } from "@/constants/colors";

export default function ProtectedLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					presentation: "modal",
					headerStyle: { backgroundColor: colors.dark.background },
					headerTintColor: colors.dark.foreground,
				}}
			/>
		</Stack>
	);
}
