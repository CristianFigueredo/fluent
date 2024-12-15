import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, useCreateChatClient, OverlayProvider } from "stream-chat-expo";
import {
	chatApiKey,
	chatUserId,
	chatUserName,
	chatUserToken,
} from "@/config/stream-chat";
import { streamTheme } from "@/config/stream-theme";

const user = {
	id: chatUserId,
	name: chatUserName,
};

type ChatWrapperProps = {
	children: React.ReactNode;
};

export const ChatProvider = ({ children }: ChatWrapperProps) => {
	const chatClient = useCreateChatClient({
		apiKey: chatApiKey,
		userData: user,
		tokenOrProvider: chatUserToken,
	});

	if (!chatClient) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-center text-lg text-foreground">Loading...</Text>
			</SafeAreaView>
		);
	}

	return (
		<OverlayProvider value={{ style: streamTheme }}>
			<Chat client={chatClient}>{children}</Chat>
		</OverlayProvider>
	);
};
