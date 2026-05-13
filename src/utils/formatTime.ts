const timeOptions = {
	hour: "numeric",
	minute: "2-digit",
	hour12: true,
} as const;

export const formatTime = (data: number) => {
	return new Date(data * 1000).toLocaleTimeString(undefined, timeOptions);
};
