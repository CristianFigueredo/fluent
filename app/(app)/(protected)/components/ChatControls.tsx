import { View, TouchableOpacity } from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ConnectionState } from "livekit-client";

export interface ChatControlsProps {
	toggleRoomConnection: () => void;
	toggleLocalAudioCapture: () => void;
	isMicrophoneEnabled: boolean;
	connectionState: ConnectionState;
}

export function ChatControls({
	toggleRoomConnection,
	toggleLocalAudioCapture,
	isMicrophoneEnabled,
	connectionState,
}: ChatControlsProps) {
	const insets = useSafeAreaInsets();

	console.log(connectionState);
	return (
		<View
			style={{ paddingBottom: insets.bottom }}
			className="flex-row justify-around items-center px-6 py-4 bg-white border-t border-gray-100"
		>
			<TouchableOpacity
				onPress={toggleRoomConnection}
				className={
					"w-12 h-12 rounded-full justify-center items-center bg-white border border-gray-100"
				}
			>
				{connectionState === ConnectionState.Connected ? (
					<Octicons name="x" size={20} color="#FF4444" />
				) : (
					<Feather name="play" size={16} color="#303030" />
				)}
			</TouchableOpacity>

			<TouchableOpacity
				onPress={toggleLocalAudioCapture}
				className={
					"w-12 h-12 rounded-full justify-center items-center bg-white border border-gray-100"
				}
			>
				{isMicrophoneEnabled ? (
					<Octicons name="unmute" size={18} color="#303030" />
				) : (
					<Octicons name="mute" size={18} color="#303030" />
				)}
			</TouchableOpacity>
		</View>
	);
}
