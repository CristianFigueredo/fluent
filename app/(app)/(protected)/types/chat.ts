import { IMessage } from "react-native-gifted-chat";

export interface ChatHeaderProps {
	onProfilePress: () => void;
	onNewChatPress: () => void;
}

export interface ChatAvatarProps {
	currentMessage?: IMessage;
}
