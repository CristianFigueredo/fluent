import { DeepPartial, Theme } from "stream-chat-expo";
import { colors } from "@/constants/colors";

export const streamTheme: DeepPartial<Theme> = {
	colors: {
		accent_blue: colors.light.primary,
		accent_green: colors.light.primary,
		accent_red: colors.light.destructive,
		bg_gradient_end: colors.light.background,
		bg_gradient_start: colors.light.background,
		black: colors.light.foreground,
		grey: colors.light.mutedForeground,
		grey_gainsboro: colors.light.muted,
		grey_whisper: colors.light.secondary,
		white: colors.light.background,
		white_snow: colors.light.card,
		overlay: `${colors.light.foreground}40`,
	},
	messageSimple: {
		content: {
			containerInner: {
				borderRadius: 16,
			},
		},
	},
};
