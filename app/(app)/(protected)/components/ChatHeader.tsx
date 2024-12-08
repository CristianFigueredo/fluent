import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatHeaderProps } from "../types/chat";

export function ChatHeader({
	onProfilePress,
	onNewChatPress,
}: ChatHeaderProps) {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{ paddingTop: insets.top }}
			className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-100"
		>
			<StatusBar barStyle="dark-content" />
			<TouchableOpacity onPress={onProfilePress}>
				<Image
					source={require("../../../../assets/chat-avatar-beta.jpg")}
					className="w-10 h-10 rounded-full"
				/>
			</TouchableOpacity>
			<Text className="text-2xl font-semibold text-[#303030]">Fluent</Text>
			<TouchableOpacity
				onPress={onNewChatPress}
				className="w-10 h-10 rounded-full justify-center items-center bg-white border border-gray-100"
			>
				<Octicons name="comment" size={14} color="#303030" />
			</TouchableOpacity>
		</View>
	);
}
