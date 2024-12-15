import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { CameraView, Camera } from "expo-camera";
import { CameraIcon } from "react-native-heroicons/outline";

export default function BroadcastScreen() {
	const insets = useSafeAreaInsets();
	const [thumbnail, setThumbnail] = React.useState<string | null>(null);
	const [cameraPermission, requestCameraPermission] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			console.log({ status });
			requestCameraPermission(status === "granted");
		})();
	}, []);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 1,
		});

		if (!result.canceled) {
			setThumbnail(result.assets[0].uri);
		}
	};

	if (!cameraPermission) {
		return null;
	}

	return (
		<View className="flex-1 bg-background">
			{/* Overlay for better visibility */}
			<View className="absolute inset-0 bg-black/40" />

			{/* Header */}
			<View
				className="px-4 flex-row justify-between items-center absolute w-full z-10"
				style={{ paddingTop: insets.top }}
			>
				<Pressable
					onPress={() => router.back()}
					className="w-10 h-10 items-center justify-center rounded-full bg-black/20"
				>
					<XMarkIcon size={24} color="white" />
				</Pressable>
			</View>

			{/* Camera Preview */}
			<CameraView
				facing={"front"}
				className="absolute inset-0"
				style={{ flex: 1 }}
			>
				{/* Content */}
				<View className="flex-1 px-4 mt-60">
					{/* Title Input Area */}
					<View className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 w-full h-3/6">
						<View className="flex-1">
							<Text className="text-xl font-medium text-white mb-4 text-center">
								Agrega un título al chat
							</Text>
							<Pressable className="h-12 rounded-xl bg-white/10 px-4 justify-center">
								<Text className="text-white/60">Ingresa un título...</Text>
							</Pressable>
						</View>
						{/* Camera Preview with Thumbnail Picker Overlay */}
						<Pressable
							onPress={pickImage}
							className="absolute inset-0 items-center justify-center flex-1 mt-28"
						>
							{thumbnail ? (
								<View className="relative w-40 h-40">
									<Image
										source={{ uri: thumbnail }}
										className="w-full h-full rounded-lg"
									/>
									<Pressable
										onPress={() => setThumbnail(null)}
										className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
									>
										<XMarkIcon size={24} color="white" />
									</Pressable>
								</View>
							) : (
								<View className="bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg items-center">
									<CameraIcon size={24} color="rgba(255,255,255,0.8)" />
									<Text className="text-white/80 text-sm mt-2">
										Toca para elegir miniatura
									</Text>
								</View>
							)}
						</Pressable>
					</View>

					{/* Go Live Button */}
					<View className="mt-auto mb-8">
						<Pressable className="h-14 rounded-xl bg-primary items-center justify-center">
							<Text className="text-primary-foreground font-semibold text-lg">
								TRANSMITIR
							</Text>
						</Pressable>
					</View>
				</View>
			</CameraView>
		</View>
	);
}
