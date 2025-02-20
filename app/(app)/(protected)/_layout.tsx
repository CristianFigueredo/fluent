import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import { ModalHeader } from "@/components/ui/modal-header";

export default function ProtectedLayout() {
	return (
		<Stack
			screenOptions={() => ({
				header: ({ navigation, route }) => {
					console.log("route", route.name);
					// Don't show header for index screen
					if (route.name === "index") return null;

					// Get the screen title
					let title = "";
					switch (route.name) {
						case "profile":
							title = "Profile";
							break;
						case "contact":
							title = "Contact Us";
							break;
						case "disclaimer":
							title = "Important Notice";
							break;
						default:
							title = route.name;
					}

					return <ModalHeader title={title} />;
				},
			})}
		>
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
				}}
			/>
			<Stack.Screen
				name="disclaimer"
				options={{
					presentation: "modal",
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name="contact"
				options={{
					presentation: "modal",
					gestureEnabled: true,
				}}
			/>
		</Stack>
	);
}
