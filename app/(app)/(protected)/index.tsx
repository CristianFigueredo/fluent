import React, { useState, useCallback, useEffect, Fragment } from "react";
import { ActivityIndicator, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useRouter } from "expo-router";
import { ChatUI } from "./components/Chat";
import {
	AudioSession,
	LiveKitRoom,
	useRoomContext,
	useConnectionState,
	useTracks,
} from "@livekit/react-native";
import { useTrackTranscription } from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import { Text, TouchableOpacity, StatusBar } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { toast } from "burnt";
import { supabase } from "@/config/supabase";
import type { SessionTokenResponse } from "@/types/livekit";
import { getInitialsFrom } from "@/lib/utils";
import { useSupabase } from "@/context/supabase-provider";

const getSessionAccessToken = async (
	participantIdentity: string,
): Promise<string> => {
	console.log("Getting session access token for", participantIdentity);
	if (!participantIdentity) {
		throw new Error("Participant identity is required");
	}
	const { data, error } = await supabase.functions.invoke<SessionTokenResponse>(
		"get-room-access-token",
		{ body: { participantIdentity } },
	);
	if (error || !data) {
		console.error("Error getting session access token:", error);
		throw new Error("Failed to get session access token");
	}
	return data.token;
};

const wsURL = "wss://fluent-d1xpqjd9.livekit.cloud";

export default function ProtectedLayout() {
	useEffect(() => {
		AudioSession.startAudioSession();
		return () => {
			AudioSession.stopAudioSession();
		};
	}, []);

	return (
		<View className="flex-1 bg-background">
			<StatusBar barStyle="light-content" />
			<LiveKitRoom serverUrl={wsURL} token={""} connect={false} audio>
				<RoomView />
			</LiveKitRoom>
		</View>
	);
}

const RoomView = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isConnecting, setIsConnecting] = useState(false);
	const room = useRoomContext();
	const connectionState = useConnectionState();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { user } = useSupabase();

	const tracks = useTracks();
	const agentAudioTrack = tracks.find(
		(trackRef) =>
			trackRef.publication.kind === Track.Kind.Audio &&
			trackRef.participant.isAgent,
	);
	const userAudioTrack = tracks.find(
		(trackRef) =>
			trackRef.publication.kind === Track.Kind.Audio &&
			trackRef.participant.isLocal,
	);

	const localMessages = useTrackTranscription(userAudioTrack);
	const agentMessages = useTrackTranscription(agentAudioTrack);

	useEffect(() => {
		const newMessages = localMessages.segments.map(
			(segment): IMessage => ({
				_id: segment.id,
				text: segment.text,
				createdAt: new Date(segment.firstReceivedTime),
				user: {
					_id: 1,
					name: "You",
				},
			}),
		);

		const agentChatMessages = agentMessages.segments.map(
			(segment): IMessage => ({
				_id: segment.id,
				text: segment.text,
				createdAt: new Date(segment.firstReceivedTime),
				user: {
					_id: 2,
					name: "Agent",
				},
			}),
		);

		const allMessages = [...newMessages, ...agentChatMessages].sort((a, b) => {
			const aTime =
				a.createdAt instanceof Date ? a.createdAt.getTime() : a.createdAt;
			const bTime =
				b.createdAt instanceof Date ? b.createdAt.getTime() : b.createdAt;
			return bTime - aTime;
		});

		setMessages(allMessages);
	}, [localMessages.segments, agentMessages.segments]);

	const onSend = useCallback((newMessages: IMessage[] = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages),
		);
	}, []);

	const toggleRoomConnection = async () => {
		try {
			if (connectionState === "connected") {
				await room.disconnect();
			} else {
				setIsConnecting(true);
				const token = await getSessionAccessToken("local-user");
				await room.connect(wsURL, token);
				await room.localParticipant.setMicrophoneEnabled(true);
				setIsConnecting(false);
			}
		} catch (error) {
			console.error("Room connection error:", error);
			toast({
				message: "Failed to connect to chat",
				title: "Error",
				duration: 3,
				preset: "error",
			});
		} finally {
			setIsConnecting(false);
		}
	};

	const toggleLocalAudioCapture = async () => {
		try {
			await room.localParticipant.setMicrophoneEnabled(
				!room.localParticipant.isMicrophoneEnabled,
			);
		} catch (error) {
			console.error("Microphone toggle error:", error);
			toast({
				message: "Failed to toggle microphone",
				title: "Error",
				duration: 3,
				preset: "error",
			});
		}
	};

	return (
		<Fragment>
			<View
				style={{ paddingTop: insets.top }}
				className="flex-row justify-between items-center px-6 py-4 bg-gradient-to-b from-muted to-background border-b border-border"
			>
				<TouchableOpacity
					onPress={() => router.push("/profile")}
					className="w-10 h-10 rounded-full bg-muted items-center justify-center"
				>
					<Text className="text-sm text-muted-foreground">
						{getInitialsFrom(user?.email)}
					</Text>
				</TouchableOpacity>
				<Text className="text-xl font-semibold text-foreground">Fluent AI</Text>
				<View />
			</View>

			{messages.length === 0 ? (
				<View className="flex-1 justify-center items-center px-8 bg-background">
					<View className="items-center bg-muted/30 p-8 rounded-2xl">
						<View className="mb-6 bg-muted p-4 rounded-full">
							<Octicons
								name="comment-discussion"
								size={28}
								color={colors.dark.foreground}
							/>
						</View>
						<Text className="text-2xl font-semibold text-foreground mb-3 text-center">
							Start a Conversation
						</Text>
						<Text className="text-base text-muted-foreground text-center max-w-[280px] leading-relaxed">
							Begin your language learning journey by sending your first message
						</Text>
					</View>
				</View>
			) : (
				<ChatUI messages={messages} onSend={onSend} />
			)}

			<View
				style={{ paddingBottom: insets.bottom }}
				className="flex-row justify-around items-center px-6 py-4 bg-gradient-to-t from-muted to-background border-t border-border"
			>
				<TouchableOpacity
					onPress={toggleRoomConnection}
					className={`w-14 h-14 rounded-full justify-center items-center ${
						connectionState === ConnectionState.Connected
							? "bg-destructive/20"
							: "bg-muted"
					}`}
					disabled={isConnecting}
				>
					{isConnecting ? (
						<ActivityIndicator size="small" color={colors.dark.foreground} />
					) : connectionState === ConnectionState.Connected ? (
						<Octicons name="x" size={20} color={colors.dark.destructive} />
					) : (
						<Feather name="play" size={18} color={colors.dark.foreground} />
					)}
				</TouchableOpacity>

				<TouchableOpacity
					onPress={toggleLocalAudioCapture}
					className={`w-14 h-14 rounded-full justify-center items-center ${
						room.localParticipant.isMicrophoneEnabled
							? "bg-primary/20"
							: "bg-muted"
					}`}
					disabled={isConnecting}
				>
					{room.localParticipant.isMicrophoneEnabled ? (
						<Octicons name="unmute" size={20} color={colors.dark.primary} />
					) : (
						<Octicons name="mute" size={20} color={colors.dark.foreground} />
					)}
				</TouchableOpacity>
			</View>
		</Fragment>
	);
};
