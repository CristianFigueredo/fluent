import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Linking } from "react-native";
import { toast } from "burnt";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitialsFrom = (email?: string) => {
	if (!email) {
		return "";
	}
	return email.substring(0, 2).toUpperCase();
};

export const openLink = async (url: string) => {
	try {
		const supported = await Linking.canOpenURL(url);
		if (!supported) {
			console.warn(`Cannot open URL: ${url}`);
			toast({
				title: "Cannot open this link",
				preset: "error",
				duration: 3,
			});
			return;
		}
		await Linking.openURL(url);
	} catch (error) {
		console.error("Error opening link:", error);
		toast({
			title: "Failed to open the link",
			preset: "error",
			duration: 3,
		});
	}
};
