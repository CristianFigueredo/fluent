import { useRouter } from "expo-router";
import React from "react";
import { View, StatusBar } from "react-native";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { openLink } from "@/lib/utils";
import { TERMS_AND_CONDITIONS_URL, PRIVACY_POLICY_URL } from "@/constants/urls";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			<StatusBar barStyle="light-content" />
			<View className="flex flex-1 items-center justify-center web:m-4">
				<Image source={require("@/assets/icon.png")} className="w-24 h-24" />
				<H1 className="text-center mb-2">Fluent AI</H1>
				<Muted className="text-center">
					{`Your AI-powered language learning companion\n tailored to your needs.`}
				</Muted>
			</View>
			<View className="flex flex-col gap-y-4 web:m-4">
				<Button
					size="default"
					variant="default"
					onPress={() => {
						router.push("/sign-up");
					}}
				>
					<Text>Sign Up</Text>
				</Button>
				<Button
					size="default"
					variant="secondary"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</Button>
				<Text className="text-sm text-center text-muted-foreground">
					By continuing you agree with our{" "}
					<Text
						onPress={() => openLink(TERMS_AND_CONDITIONS_URL)}
						className="text-primary underline text-sm"
					>
						Terms
					</Text>{" "}
					and{" "}
					<Text
						onPress={() => openLink(PRIVACY_POLICY_URL)}
						className="text-primary underline text-sm"
					>
						Privacy Policy
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}
