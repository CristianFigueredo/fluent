import React, { PropsWithChildren, useState } from "react";
import { Channel, Thread } from "stream-chat-expo";

export const AppContext = React.createContext({
	channel: null,
	setChannel: (channel: any) => {},
	thread: null,
	setThread: (thread: any) => {},
});

type AppProviderProps = PropsWithChildren;

export const AppProvider = ({ children }: AppProviderProps) => {
	const [channel, setChannel] = useState(null);
	const [thread, setThread] = useState(null);

	return (
		<AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => React.useContext(AppContext);
