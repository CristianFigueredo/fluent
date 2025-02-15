import * as React from "react";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { cn } from "@/lib/utils";

interface CheckboxProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
}

const Checkbox = React.forwardRef<
	React.ElementRef<typeof Pressable>,
	CheckboxProps
>(({ checked = false, onCheckedChange, disabled, className }, ref) => {
	return (
		<Pressable
			ref={ref}
			disabled={disabled}
			className={cn(
				"peer h-6 w-6 shrink-0 rounded-lg border-2 border-muted-foreground/50 ring-offset-background",
				"web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
				checked && "bg-primary border-primary",
				disabled && "opacity-50 cursor-not-allowed",
				className,
			)}
			onPress={() => {
				onCheckedChange?.(!checked);
			}}
		>
			{checked && (
				<View className="flex items-center justify-center h-full">
					<Feather name="check" size={16} color="white" />
				</View>
			)}
		</Pressable>
	);
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
