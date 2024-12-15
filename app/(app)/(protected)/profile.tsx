import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import {
	ArrowRightOnRectangleIcon,
	DocumentTextIcon,
	TrashIcon,
	LanguageIcon,
	BellIcon,
	SunIcon,
	WifiIcon,
	PlayIcon,
} from "react-native-heroicons/outline";

import { useSupabase } from "@/context/supabase-provider";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

const APP_VERSION = "1.0.0";

export default function ProfileScreen() {
	const { signOut, user } = useSupabase();
	const { colorScheme, setColorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const insets = useSafeAreaInsets();

	const getInitials = () => {
		if (!user?.email) return "??";
		return user.email.split("@")[0].slice(0, 2).toUpperCase();
	};

	const MenuButton = ({
		icon: Icon,
		text,
		onPress,
		isDestructive = false,
		rightText,
		showSwitch,
		switchValue,
		onSwitchChange,
	}: {
		icon: React.ElementType;
		text: string;
		onPress: () => void;
		isDestructive?: boolean;
		rightText?: string;
		showSwitch?: boolean;
		switchValue?: boolean;
		onSwitchChange?: (value: boolean) => void;
	}) => (
		<Pressable
			onPress={onPress}
			className="flex-row items-center px-5 h-14 bg-secondary/30"
		>
			<Icon
				size={20}
				color={
					isDestructive
						? isDark
							? colors.dark.destructive
							: colors.light.destructive
						: isDark
							? colors.dark.foreground
							: colors.light.foreground
				}
			/>
			<Text
				className={`flex-1 ml-3 text-[15px] font-normal ${
					isDestructive ? "text-destructive" : "text-foreground"
				}`}
			>
				{text}
			</Text>
			{rightText && (
				<Text className="text-muted-foreground text-sm mr-2">{rightText}</Text>
			)}
			{showSwitch ? (
				<Switch value={switchValue} onValueChange={onSwitchChange} />
			) : (
				<Text className="text-muted-foreground">›</Text>
			)}
		</Pressable>
	);

	const MenuGroup = ({
		title,
		children,
	}: {
		title: string;
		children: React.ReactNode;
	}) => (
		<View className="mb-6">
			<Text className="text-muted-foreground text-xs font-medium px-5 pb-1 uppercase">
				{title}
			</Text>
			<View className="border-y border-muted/30 divide-y divide-muted/30">
				{children}
			</View>
		</View>
	);

	return (
		<ScrollView
			className="flex-1 bg-background"
			contentContainerStyle={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom + 16,
			}}
		>
			{/* Profile Header */}
			<View className="items-center py-6">
				<View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-2 border border-muted">
					<Text className="text-2xl text-foreground font-medium">
						{getInitials()}
					</Text>
				</View>
				<Text className="text-foreground text-lg font-medium mb-1">
					{user?.email?.split("@")[0]}
				</Text>
				<Text className="text-muted-foreground text-sm">{user?.email}</Text>
			</View>
			{/* Preferences */}
			<MenuGroup title="Preferencias">
				<MenuButton
					icon={LanguageIcon}
					text="Idioma"
					rightText="Español"
					onPress={() => {}}
				/>
				<MenuButton
					icon={BellIcon}
					text="Notificaciones"
					rightText="Activadas"
					onPress={() => {}}
				/>
				<MenuButton
					icon={SunIcon}
					text="Tema"
					rightText={isDark ? "Oscuro" : "Claro"}
					onPress={() => setColorScheme(isDark ? "light" : "dark")}
				/>
				<MenuButton
					icon={WifiIcon}
					text="Descargar solo con WiFi"
					showSwitch
					switchValue={false}
					onPress={() => {}}
				/>
				<MenuButton
					icon={PlayIcon}
					text="Reproducción automática"
					showSwitch
					onPress={() => {}}
					switchValue={true}
					onSwitchChange={() => {}}
				/>
			</MenuGroup>

			<MenuGroup title="Legal">
				<MenuButton
					icon={DocumentTextIcon}
					text="Términos de servicio"
					onPress={() => {}}
				/>
				<MenuButton
					icon={DocumentTextIcon}
					text="Política de privacidad"
					onPress={() => {}}
				/>
			</MenuGroup>

			<MenuGroup title="Peligro">
				<MenuButton
					icon={TrashIcon}
					text="Eliminar cuenta"
					onPress={() => {}}
					isDestructive
				/>
				<MenuButton
					icon={ArrowRightOnRectangleIcon}
					text="Cerrar sesión"
					onPress={signOut}
					isDestructive
				/>
			</MenuGroup>

			{/* Version */}
			<Text className="text-center text-xs text-muted-foreground mt-4">
				Versión {APP_VERSION}
			</Text>
		</ScrollView>
	);
}
