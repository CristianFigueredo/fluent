import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitialsFrom = (email?: string) => {
	if (!email) {
		return "";
	}
	return email.substring(0, 2).toUpperCase();
};
