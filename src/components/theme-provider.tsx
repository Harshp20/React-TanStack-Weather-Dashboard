import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import { ThemeProviderContext } from "@/hooks/useTheme";
import {
	applyResolvedTheme,
	applyTheme,
	getStoredTheme,
	getSystemTheme,
	type ResolvedTheme,
	setStoredTheme,
	subscribeSystemTheme,
	type ThemeMode,
} from "@/lib/theme";

const STORAGE_KEY = "weather-dashboard-theme";

type ThemeProviderProps = Readonly<{
	children: React.ReactNode;
	defaultTheme?: ThemeMode;
	storageKey?: string;
}>;

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeMode>(() => {
		if (typeof globalThis.window === "undefined") return defaultTheme;
		const stored = localStorage.getItem(storageKey) as ThemeMode | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
		return getStoredTheme();
	});

	const systemTheme = useSyncExternalStore(
		subscribeSystemTheme,
		getSystemTheme,
		() => "light" as ResolvedTheme,
	);

	const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

	const setTheme = useCallback(
		(next: ThemeMode) => {
			localStorage.setItem(storageKey, next);
			setStoredTheme(next);
			applyTheme(next);
			setThemeState(next);
		},
		[storageKey],
	);

	useEffect(() => {
		applyResolvedTheme(resolvedTheme);
	}, [resolvedTheme]);

	const value = useMemo(
		() => ({ theme, resolvedTheme, setTheme }),
		[theme, resolvedTheme, setTheme],
	);

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
