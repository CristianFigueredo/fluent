import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

interface StreamItemProps {
	id: string;
	title: string;
	username: string;
	thumbnailUrl?: string | null;
	userAvatarUrl?: string | null;
}

export function StreamItem({
	id,
	title,
	username,
	thumbnailUrl,
	userAvatarUrl,
}: StreamItemProps) {
	const getInitials = () => {
		return username.slice(0, 2).toUpperCase();
	};

	return (
		<Pressable
			onPress={() => router.push(`/stream/${id}`)}
			className="flex-1 mb-2"
		>
			{/* Thumbnail */}
			<View className="rounded-2xl overflow-hidden relative">
				<Image
					source={thumbnailUrl}
					className="w-full h-72"
					resizeMode="cover"
				/>
				{/* Live Badge */}
				<View className="bg-black/50 px-3 py-1.5 rounded-lg absolute top-3 right-3">
					<Text className="text-xs font-bold text-white">EN VIVO</Text>
				</View>
			</View>

			{/* Stream Info */}
			<View className="flex-row mt-3 items-center">
				{/* Avatar */}
				{userAvatarUrl ? (
					<Image
						source={{ uri: userAvatarUrl }}
						className="w-8 h-8 rounded-full"
					/>
				) : (
					<View className="w-8 h-8 rounded-full bg-secondary items-center justify-center">
						<Text className="text-xs font-medium text-foreground">
							{getInitials()}
						</Text>
					</View>
				)}

				{/* Info */}
				<View className="flex-1 ml-2">
					<Text
						numberOfLines={1}
						className="text-base font-medium text-foreground"
					>
						{title}
					</Text>
					<Text className="text-sm text-muted-foreground">{username}</Text>
				</View>
			</View>
		</Pressable>
	);
}
