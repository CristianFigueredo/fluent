import { View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

export function EmptyState() {
	return (
		<View className="flex-1 justify-center items-center px-8">
			<View className="items-center">
				<View className="mb-7">
					<Octicons name="comment-discussion" size={28} color="#E5E7EB" />
				</View>
				<Text className="text-[22px] font-medium text-gray-900 mb-2.5 text-center">
					Start a Conversation
				</Text>
				<Text className="text-[15px] text-gray-400 text-center max-w-[260px] leading-relaxed">
					Begin your language learning journey by sending your first message
				</Text>
			</View>
		</View>
	);
}
