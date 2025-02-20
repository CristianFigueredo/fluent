import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { supabase } from "@/config/supabase";
import { useSupabase } from "@/context/supabase-provider";
import { useState } from "react";
import { toast } from "burnt";
import { Input } from "@/components/ui/input";

export default function ContactScreen() {
	const router = useRouter();
	const { user } = useSupabase();
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);

	const handleSubmit = async () => {
		if (!message.trim()) {
			toast({
				title: "Error",
				message: "Please enter a message",
				preset: "error",
			});
			return;
		}

		setIsSending(true);
		try {
			const { error } = await supabase.from("contact_messages").insert([
				{
					user_id: user?.id,
					user_email: user?.email,
					message: message.trim(),
				},
			]);

			if (error) throw error;

			toast({
				title: "Success",
				message: "Your message has been sent. We'll get back to you soon.",
				preset: "done",
			});
			router.back();
		} catch (error) {
			console.error("Error sending message:", error);
			toast({
				title: "Error",
				message: "Failed to send message. Please try again.",
				preset: "error",
			});
		} finally {
			setIsSending(false);
		}
	};

	return (
		<View className="flex-1 bg-background">
			<ScrollView className="flex-1 p-6">
				<View className="items-center mb-8">
					<View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-6">
						<Ionicons
							name="mail-outline"
							size={32}
							color={colors.dark.primary}
						/>
					</View>
					<H1 className="text-2xl font-bold mb-2 text-center">Get in Touch</H1>
					<Muted className="text-base text-center">
						We're here to help! Send us your feedback or report any issues
						you've encountered.
					</Muted>
				</View>

				<View className="space-y-6">
					<View>
						<Text className="text-sm text-muted-foreground mb-2">
							Your Email
						</Text>
						<Input
							value={user?.email || ""}
							editable={false}
							className="bg-muted"
						/>
					</View>

					<View>
						<Text className="text-sm text-muted-foreground mb-2">Message</Text>
						<Input
							multiline
							numberOfLines={6}
							textAlignVertical="top"
							value={message}
							onChangeText={setMessage}
							placeholder="Type your message here..."
							className="min-h-[120px] py-2"
						/>
					</View>
				</View>
			</ScrollView>

			<View className="p-6 border-t border-border">
				<Button
					size="lg"
					variant="default"
					onPress={handleSubmit}
					disabled={isSending}
				>
					<View className="flex-row items-center">
						<Text className="text-primary-foreground font-medium mr-2">
							{isSending ? "Sending..." : "Send Message"}
						</Text>
					</View>
				</Button>
			</View>
		</View>
	);
}
