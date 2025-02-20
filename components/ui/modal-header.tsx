import { View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { Button } from "./button";
import { H1 } from "./typography";

interface ModalHeaderProps {
	title: string;
	showBackButton?: boolean;
	onBackPress?: () => void;
}

export function ModalHeader({
	title,
	showBackButton = true,
	onBackPress,
}: ModalHeaderProps) {
	const router = useRouter();

	const handleBackPress = () => {
		if (onBackPress) {
			onBackPress();
		} else {
			router.back();
		}
	};

	return (
		<View className="bg-background flex-row items-center px-4 py-2 border-b border-border">
			{showBackButton && (
				<Button
					variant="ghost"
					size="icon"
					onPress={handleBackPress}
					className="mr-2"
				>
					<Ionicons name="close" size={24} color={colors.dark.foreground} />
				</Button>
			)}
			<H1 className="text-xl">{title}</H1>
		</View>
	);
}
