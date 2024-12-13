import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
	const { setColorScheme, toggleColorScheme } = useNativewindColorScheme();
	return {
		colorScheme: "dark",
		isDarkColorScheme: true,
		setColorScheme,
		toggleColorScheme,
	};
}
