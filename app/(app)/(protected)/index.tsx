import React, { useState, useCallback, useEffect, Fragment } from "react";
import { View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useRouter } from "expo-router";
import { ChatHeader } from "./components/ChatHeader";
import { ChatControls } from "./components/ChatControls";
import { Chat } from "./components/Chat";
import { EmptyState } from "./components/EmptyState";
import {
	AudioSession,
	LiveKitRoom,
	useRoomContext,
	useConnectionState,
	useTracks,
} from "@livekit/react-native";
import { useTrackTranscription } from "@livekit/components-react";
import { Track } from "livekit-client";

const wsURL = "";
const token = "";

export default function ProtectedLayout() {
	useEffect(() => {
		AudioSession.startAudioSession();
		return () => {
			AudioSession.stopAudioSession();
		};
	}, []);

	return (
		<View className="flex-1 bg-white">
			<LiveKitRoom serverUrl={wsURL} token={token} connect={false} audio>
				<RoomView />
			</LiveKitRoom>
		</View>
	);
}

const RoomView = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const room = useRoomContext();
	const connectionState = useConnectionState();
	const router = useRouter();

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

	console.log(localMessages.segments);

	useEffect(() => {
		const newMessages = localMessages.segments.map(
			(segment): IMessage => ({
				_id: segment.id,
				text: segment.text,
				createdAt: new Date(segment.firstReceivedTime),
				user: {
					_id: 1, // local user
					name: "You",
				},
			}),
		);

		// If we have agent messages, add those too
		const agentChatMessages = agentMessages.segments.map(
			(segment): IMessage => ({
				_id: segment.id,
				text: segment.text,
				createdAt: new Date(segment.firstReceivedTime),
				user: {
					_id: 2, // agent
					name: "Agent",
				},
			}),
		);

		// Combine and sort all messages by time
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
		if (connectionState === "connected") {
			await room.disconnect();
		} else {
			room.localParticipant.setMicrophoneEnabled(true);
			await room.connect(wsURL, token);
		}
	};

	const toggleLocalAudioCapture = () => {
		room.localParticipant.setMicrophoneEnabled(
			!room.localParticipant.isMicrophoneEnabled,
		);
	};

	return (
		<Fragment>
			<ChatHeader
				onProfilePress={() => router.push("/profile")}
				onNewChatPress={() => {}}
			/>
			{messages.length === 0 ? (
				<EmptyState />
			) : (
				<Chat messages={messages} onSend={onSend} />
			)}
			<ChatControls
				toggleRoomConnection={toggleRoomConnection}
				toggleLocalAudioCapture={toggleLocalAudioCapture}
				isMicrophoneEnabled={room.localParticipant.isMicrophoneEnabled}
				connectionState={connectionState}
			/>
		</Fragment>
	);
};
