import { Stack } from "expo-router";

export default function ProtectedLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="profile" options={{ presentation: "modal" }} />
		</Stack>
	);
}
