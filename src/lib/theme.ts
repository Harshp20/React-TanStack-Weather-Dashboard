export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "weather-dashboard-theme";

export function getStoredTheme(): ThemeMode {
	if (typeof window === "undefined") return "system";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark" || stored === "system") {
		return stored;
	}
	return "system";
}

export function setStoredTheme(mode: ThemeMode) {
	localStorage.setItem(STORAGE_KEY, mode);
}

export function resolveTheme(mode: ThemeMode): "light" | "dark" {
	if (mode === "system") {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	return mode;
}

export function applyTheme(mode: ThemeMode) {
	const resolved = resolveTheme(mode);
	document.documentElement.classList.toggle("dark", resolved === "dark");
	document.documentElement.style.colorScheme = resolved;
}

/** Run before React mounts to avoid theme flash. */
export function initTheme() {
	applyTheme(getStoredTheme());
}
