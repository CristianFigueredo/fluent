import { Pressable, Text } from "react-native";
import React from "react";

interface CategoryPillProps {
	label: string;
	isSelected: boolean;
	onPress: () => void;
}

export function CategoryPill({
	label,
	isSelected,
	onPress,
}: CategoryPillProps) {
	return (
		<Pressable
			onPress={onPress}
			className={`px-4 py-2 rounded-full mr-2 ${
				isSelected ? "bg-primary" : "bg-secondary/50"
			}`}
		>
			<Text
				className={`${
					isSelected ? "text-primary-foreground" : "text-muted-foreground"
				}`}
			>
				{label}
			</Text>
		</Pressable>
	);
}
