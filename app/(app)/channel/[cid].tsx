import React, { useContext, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import {
	Channel,
	MessageInput,
	MessageList,
	useAttachmentPickerContext,
} from "stream-chat-expo";
import { AppContext } from "@/components/app-context";
import { useHeaderHeight } from "@react-navigation/elements";

export default function ChannelScreen() {
	const { channel } = useContext(AppContext);
	const { setTopInset } = useAttachmentPickerContext();
	const headerHeight = useHeaderHeight();

	useEffect(() => {
		setTopInset(headerHeight);
	}, [headerHeight, setTopInset]);

	if (!channel) {
		return (
			<SafeAreaView>
				<Text>Loading chat ...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{channel ? (
				<Channel channel={channel} keyboardVerticalOffset={headerHeight}>
					<MessageList />
					<MessageInput />
				</Channel>
			) : null}
		</SafeAreaView>
	);
}
