export const formatDate = (data: number) => {
	return new Date(data * 1000).toLocaleDateString("en-US", {
		weekday: "short",
	});
};
