import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import { ModalHeader } from "@/components/ui/modal-header";

export const unstable_settings = {
	initialRouteName: "welcome",
};

export default function AppLayout() {
	return (
		<Stack
			screenOptions={({ route }) => ({
				header: ({ navigation, route }) => {
					// Don't show header for welcome screen
					if (route.name === "welcome") return null;

					// Get the screen title
					let title = "";
					switch (route.name) {
						case "sign-up":
							title = "Sign Up";
							break;
						case "sign-in":
							title = "Sign In";
							break;
						default:
							title = route.name;
					}

					return <ModalHeader title={title} variant="back" />;
				},
			})}
		>
			<Stack.Screen name="welcome" />
			<Stack.Screen
				name="sign-up"
				options={{
					headerShown: true,
					presentation: "modal",
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen
				name="sign-in"
				options={{
					headerShown: true,
					presentation: "modal",
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen name="(protected)" options={{ headerShown: false }} />
		</Stack>
	);
}
