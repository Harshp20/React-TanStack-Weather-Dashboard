import toast from "react-hot-toast";

export const toastOptions = {
	style: {
		background: "var(--dashboard-card)",
		color: "var(--dashboard-fg)",
		border: "1px solid var(--dashboard-border-subtle)",
		borderRadius: "0.75rem",
		boxShadow:
			"0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -2px rgba(0, 0, 0, 0.15)",
		fontSize: "0.875rem",
		maxWidth: "22rem",
	},
	iconTheme: {
		primary: "var(--dashboard-accent)",
		secondary: "var(--dashboard-card)",
	},
} as const;

export type NotifyVariant = "default" | "success" | "error" | "loading";

export function notify(message: string, variant: NotifyVariant = "default") {
	switch (variant) {
		case "success":
			return toast.success(message);
		case "error":
			return toast.error(message);
		case "loading":
			return toast.loading(message);
		default:
			return toast(message);
	}
}
