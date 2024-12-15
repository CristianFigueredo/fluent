import { Tabs } from "expo-router";
import React from "react";
import {
	HomeIcon,
	UserIcon,
	VideoCameraIcon,
	ChatBubbleLeftRightIcon,
} from "react-native-heroicons/outline";
import {
	HomeIcon as HomeIconSolid,
	UserIcon as UserIconSolid,
	VideoCameraIcon as VideoCameraIconSolid,
	ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
} from "react-native-heroicons/solid";

import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const iconColor =
		colorScheme === "dark" ? colors.dark.foreground : colors.light.foreground;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
				},
				tabBarActiveTintColor:
					colorScheme === "dark"
						? colors.dark.foreground
						: colors.light.foreground,
				tabBarShowLabel: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Inicio",
					tabBarIcon: ({ focused }) =>
						focused ? (
							<HomeIconSolid size={24} color={iconColor} />
						) : (
							<HomeIcon size={24} color={iconColor} />
						),
				}}
			/>
			<Tabs.Screen
				name="broadcast"
				options={{
					title: "Transmitir",
					tabBarIcon: ({ focused }) =>
						focused ? (
							<VideoCameraIconSolid size={24} color={iconColor} />
						) : (
							<VideoCameraIcon size={24} color={iconColor} />
						),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: "Chat",
					tabBarIcon: ({ focused }) =>
						focused ? (
							<ChatBubbleLeftRightIconSolid size={24} color={iconColor} />
						) : (
							<ChatBubbleLeftRightIcon size={24} color={iconColor} />
						),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Perfil",
					tabBarIcon: ({ focused }) =>
						focused ? (
							<UserIconSolid size={24} color={iconColor} />
						) : (
							<UserIcon size={24} color={iconColor} />
						),
				}}
			/>
		</Tabs>
	);
}
