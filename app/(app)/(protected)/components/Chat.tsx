import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	GiftedChat,
	IMessage,
	Bubble,
	BubbleProps,
	AvatarProps,
} from "react-native-gifted-chat";

interface ChatProps {
	messages: IMessage[];
	onSend: (messages: IMessage[]) => void;
}

const DisabledInputToolbar = () => null;
type ChatBubbleProps = BubbleProps<IMessage>;
const ChatBubble = (props: ChatBubbleProps) => (
	<Bubble
		{...props}
		wrapperStyle={{
			left: styles.leftBubble,
			right: styles.rightBubble,
		}}
		textStyle={{
			left: styles.leftText,
			right: styles.rightText,
		}}
	/>
);

type ChatAvatarProps = AvatarProps<IMessage>;
const ChatAvatar = (props: ChatAvatarProps) => (
	<View style={styles.avatarContainer}>
		<Text style={styles.avatarText}>
			{props.currentMessage?.user._id === 1 ? "U" : "AI"}
		</Text>
	</View>
);

export function Chat({ messages, onSend }: ChatProps) {
	return (
		<GiftedChat
			messages={messages}
			onSend={onSend}
			user={{
				_id: 1,
				name: "Developer",
				avatar: "https://placeimg.com/140/140/any",
			}}
			renderInputToolbar={DisabledInputToolbar}
			renderBubble={ChatBubble}
			messagesContainerStyle={styles.messagesContainer}
			showUserAvatar
			listViewProps={{
				showsVerticalScrollIndicator: false,
				contentContainerStyle: styles.listViewContent,
			}}
			renderAvatar={ChatAvatar}
		/>
	);
}

const styles = StyleSheet.create({
	leftBubble: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 4,
		marginBottom: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 1,
	},
	rightBubble: {
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		borderRadius: 20,
		padding: 4,
		marginBottom: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 1,
	},
	leftText: {
		color: "#303030",
		fontSize: 15,
	},
	rightText: {
		color: "#FFFFFF",
		fontSize: 15,
	},
	avatarContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		overflow: "hidden",
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1.5,
		borderColor: "#f3f4f6",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 1,
	},
	avatarText: {
		color: "#303030",
		fontSize: 14,
		letterSpacing: -0.5,
	},
	messagesContainer: {
		backgroundColor: "#FFF5F5",
	},
	listViewContent: {
		paddingVertical: 22,
		paddingHorizontal: 8,
	},
});
