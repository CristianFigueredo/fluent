import {
	View,
	FlatList,
	RefreshControl,
	Text,
	ScrollView,
	Pressable,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { StreamItem } from "./components/stream-item";
import { CategoryPill } from "./components/category-pill";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

// Categories data
const CATEGORIES = [
	"Todo",
	"Desarrollo",
	"Música",
	"Arte",
	"Deportes",
	"Educación",
];

interface Stream {
	id: string;
	title: string;
	username: string;
	thumbnailUrl: string | null;
	userAvatarUrl: string | null;
}

// Temporary mock data
const MOCK_STREAMS: Stream[] = [
	{
		id: "1",
		title: "🎮 Jugando Fortnite con amigos",
		username: "carlos_gaming",
		thumbnailUrl: require("@/assets/placeholder-beta.avif"),
		userAvatarUrl: null,
	},
	{
		id: "2",
		title: "📱 Desarrollando una app en React Native",
		username: "maria_dev",
		thumbnailUrl: require("@/assets/placeholder-beta.avif"),
		userAvatarUrl: null,
	},
	{
		id: "3",
		title: "🎨 Diseñando logos en tiempo real",
		username: "design_master",
		thumbnailUrl: require("@/assets/placeholder-beta.avif"),
		userAvatarUrl: null,
	},
	{
		id: "4",
		title: "🎵 Sesión de música en vivo",
		username: "dj_master",
		thumbnailUrl: require("@/assets/placeholder-beta.avif"),
		userAvatarUrl: null,
	},
];

export default function HomeScreen() {
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = React.useState(false);
	const [selectedCategory, setSelectedCategory] = React.useState("Todo");
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const handleRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const renderItem = React.useCallback(
		({ item, index }: { item: Stream; index: number }) => (
			<View
				style={{
					flex: 1,
					marginLeft: index % 2 === 0 ? 0 : 8,
					marginRight: index % 2 === 0 ? 8 : 0,
				}}
			>
				<StreamItem {...item} />
			</View>
		),
		[],
	);

	return (
		<View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
			{/* Header */}
			<View className="px-4 py-3 flex-row items-center justify-between">
				<Text className="text-2xl font-semibold text-foreground">
					Transmisiones en vivo
				</Text>
				<Pressable
					onPress={() => {}}
					className="w-10 h-10 items-center justify-center"
				>
					<MagnifyingGlassIcon
						size={24}
						color={isDark ? colors.dark.foreground : colors.light.foreground}
					/>
				</Pressable>
			</View>

			{/* Categories */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="mt-3"
				contentContainerStyle={{ paddingHorizontal: 16 }}
			>
				{CATEGORIES.map((category) => (
					<CategoryPill
						key={category}
						label={category}
						isSelected={selectedCategory === category}
						onPress={() => setSelectedCategory(category)}
					/>
				))}
			</ScrollView>

			<FlatList
				data={MOCK_STREAMS}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				numColumns={2}
				className="mt-8"
				contentContainerStyle={{
					paddingHorizontal: 12,
					paddingBottom: insets.bottom + 16,
				}}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						tintColor={isDark ? colors.dark.primary : colors.light.primary}
					/>
				}
			/>
		</View>
	);
}
