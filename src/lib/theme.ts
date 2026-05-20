export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

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

export function getSystemTheme(): ResolvedTheme {
	return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function subscribeSystemTheme(onStoreChange: () => void) {
	const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
	media.addEventListener("change", onStoreChange);
	return () => media.removeEventListener("change", onStoreChange);
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
	if (mode === "system") {
		return getSystemTheme();
	}
	return mode;
}

export function applyResolvedTheme(resolved: ResolvedTheme) {
	document.documentElement.classList.toggle("dark", resolved === "dark");
	document.documentElement.style.colorScheme = resolved;
}

export function applyTheme(mode: ThemeMode) {
	applyResolvedTheme(resolveTheme(mode));
}

/** Run before React mounts to avoid theme flash. */
export function initTheme() {
	applyTheme(getStoredTheme());
}
