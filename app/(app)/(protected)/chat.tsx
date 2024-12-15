import { View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useMemo } from "react";
import { chatUserId } from "@/config/stream-chat";
import { useRouter } from "expo-router";
import { useAppContext } from "@/components/app-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

const filters = {
	members: { $in: [chatUserId] },
	type: "messaging",
};
const options = {
	state: true,
	watch: true,
};

export default function ChannelListScreen() {
	const memoizedFilters = useMemo(() => filters, []);

	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { setChannel } = useAppContext();

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: "white",
				paddingHorizontal: 16,
			}}
		>
			<Text className="text-2xl font-semibold text-foreground">Chats</Text>
			<ChannelList
				filters={memoizedFilters}
				options={options}
				sort={{ last_updated: -1 }}
				onSelect={(channel) => {
					setChannel(channel);
					router.push(`/channel/${channel.cid}`);
				}}
			/>
		</View>
	);
}
