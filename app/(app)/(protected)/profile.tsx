import { View, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSupabase } from "@/context/supabase-provider";
import { colors } from "@/constants/colors";
import { getInitialsFrom, openLink } from "@/lib/utils";
import { TERMS_AND_CONDITIONS_URL, PRIVACY_POLICY_URL } from "@/constants/urls";
import { supabase } from "@/config/supabase";

export default function Profile() {
	const { signOut, user } = useSupabase();

	const requestAccountDeletion = async () => {
		try {
			const { error } = await supabase
				.from("deletion_requests")
				.insert([{ user_id: user?.id, status: "pending" }]);

			if (error) throw error;

			Alert.alert(
				"Request Submitted",
				"Your account deletion request has been submitted. We'll process it soon.",
				[{ text: "OK", onPress: signOut }],
			);
		} catch (error) {
			console.error("Error requesting account deletion:", error);
			Alert.alert(
				"Error",
				"Failed to submit account deletion request. Please try again later.",
			);
		}
	};

	const confirmDeletion = () => {
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: requestAccountDeletion,
				},
			],
		);
	};

	return (
		<ScrollView className="flex-1 bg-background">
			{/* Profile Section */}
			<View className="px-6 py-8 border-b border-border">
				<View className="items-center mb-4">
					<View className="w-24 h-24 rounded-full mb-4 bg-muted items-center justify-center">
						<Text className="text-2xl text-muted-foreground">
							{getInitialsFrom(user?.email)}
						</Text>
					</View>
					<Text className="text-lg font-medium text-foreground">
						{user?.email}
					</Text>
				</View>
			</View>

			{/* App Settings */}
			<View className="px-6 py-4 border-b border-border">
				<Text className="text-sm font-medium text-muted-foreground mb-3">
					App Settings
				</Text>
				<View className="space-y-1">
					<Button
						variant="ghost"
						className="flex-row justify-between items-center w-full py-3"
						onPress={() =>
							openLink("market://details?id=app.fluent.ai&showAllReviews=true")
						}
					>
						<Text className="text-foreground">Rate the App</Text>
						<Ionicons
							name="arrow-forward-outline"
							size={20}
							color={colors.dark.mutedForeground}
						/>
					</Button>
					<Button
						variant="ghost"
						className="flex-row justify-between items-center w-full py-3"
						onPress={signOut}
					>
						<Text className="text-foreground">Sign Out</Text>
						<Ionicons
							name="log-out-outline"
							size={20}
							color={colors.dark.mutedForeground}
						/>
					</Button>
					<Button
						variant="ghost"
						className="flex-row justify-between items-center w-full py-3"
						onPress={confirmDeletion}
					>
						<Text className="text-destructive">Delete Account</Text>
						<Ionicons
							name="trash-outline"
							size={20}
							color={colors.dark.destructive}
						/>
					</Button>
				</View>
			</View>

			{/* Legal */}
			<View className="px-6 py-4">
				<Text className="text-sm font-medium text-muted-foreground mb-3">
					Legal
				</Text>
				<View className="space-y-1">
					<Button
						variant="ghost"
						className="flex-row justify-between items-center w-full py-3"
						onPress={() => openLink(TERMS_AND_CONDITIONS_URL)}
					>
						<Text className="text-foreground">Terms and Conditions</Text>
						<Ionicons
							name="arrow-forward-outline"
							size={20}
							color={colors.dark.mutedForeground}
						/>
					</Button>
					<Button
						variant="ghost"
						className="flex-row justify-between items-center w-full py-3"
						onPress={() => openLink(PRIVACY_POLICY_URL)}
					>
						<Text className="text-foreground">Privacy Policy</Text>
						<Ionicons
							name="arrow-forward-outline"
							size={20}
							color={colors.dark.mutedForeground}
						/>
					</Button>
				</View>
			</View>

			{/* App Version */}
			<View className="px-6 py-4 items-center">
				<Text className="text-sm text-muted-foreground">Version 1.0.0</Text>
			</View>
		</ScrollView>
	);
}
